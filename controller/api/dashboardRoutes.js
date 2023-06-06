const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User, Post, Comment } = require('../../models');

// display all user's routes
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((user) => user.get({ plain: true }));

    res.render('dashboard', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const { title, content } = req.body;
      const newPost = await Post.create({
        title,
        content,
        author: req.session.username, 
        user_id: req.session.user_id,
      });
  
      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Update a post
  router.put('/:id', withAuth, async (req, res) => {
    try {
      const updatedPost = await Post.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        }
      );
  
      if (!updatedPost[0]) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
  
      res.status(200).json({ message: 'Post updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Delete a post
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const deletedPost = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!deletedPost) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;