const router = require('express').Router();
const loginRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes')
const commRoutes = require('./commentRoute'); 

router.use('/users', loginRoutes);
router.use('/blog', blogRoutes);
router.use('/comm', commRoutes);

module.exports = router;