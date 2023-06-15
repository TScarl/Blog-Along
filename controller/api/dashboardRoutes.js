const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User, Post } = require('../../models');

// Create a new post
router.post('/posts', withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = await User.findByPk(req.session.user_id);
    const author = user.name;

    const newPost = await Post.create({
      title,
      content,
      author,
      user_id: req.session.user_id,
    });

    res.status(201).json({ message: 'Successfully created a new post', newPost });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post
router.put('/posts/:id', withAuth, async (req, res) => {
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

    if (updatedPost[0] === 0) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/posts/:id', withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (deletedPost === 0) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;