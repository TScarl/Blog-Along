const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// displays a single post
router.get('/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['name'],
          },
        },
      ],
    });

    if (!post) {
      res.status(404).json({ message: 'No posts found by this user'});
      return;
    }

    const formattedPost = post.get({ plain: true });

    res.render('post', {
      post: formattedPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to find your posts" })
  }
});

module.exports = router;

