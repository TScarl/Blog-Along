const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// displays all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Unable to find posts" })
  }
});

// login route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

// signup route
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/')
  } else {
    res.render('signup');
  }
});

// signout route
router.get('/signout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// dashboard route with all users posts
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
