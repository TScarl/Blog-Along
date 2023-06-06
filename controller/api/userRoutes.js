const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ where: { email } });

    if (!userData) {
      return res.status(400).json({ message: 'Incorrect email or password, please try again' });
    }

    const validPassword = await userData.checkPassword(password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect email or password, please try again' });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: 'Failed to destroy session', error: err });
      } else {
      res.status(200).json({ message: 'Logout successful' });
      }
    });
  } else {
    res.status(404).json({ message: 'No user logged in' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = await User.create({
      email,
      password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json({ user: newUser, message: 'You are now signed up and logged in!' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failed to sign up', error: err.message });
  }
});

module.exports = router;