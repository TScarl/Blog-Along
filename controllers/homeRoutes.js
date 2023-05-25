const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll();

    res.render("blogs", { blogs });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Unable to find blogs" })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    res.render("blog", { blog });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Unable to find the blogs" })
  }
});

module.exports = router;
