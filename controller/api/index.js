const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const postRoutes = require('./postRoutes');

router.use('/user', userRoutes);
router.use('/posts', postRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
