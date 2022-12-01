const router = require('express').Router();
const session = require('express-session');
const { Comment, Blog, User } = require('../models');
const withAuth = require('../utils/auth');

//getting all blog posts
router.get('/', withAuth, async (req,res) => {
    console.log("get all started")
    try {
        const blogs = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const blog = blogs.map((post) => post.get({ plain: true }));
    res.render('homepage', {
        blog,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json(err);
    }
});
//get 1 blog post with comments
router.get('/:id', withAuth, (req, res) => {
    console.log("get by id is running instead")
    Blog.findByPk(req.params.id).then((blogData) => {
        res.json(blogData);
    });
});

router.get('/dashboard', async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Blog,
            },
            {
                model: Comment,
            },
        ],
      });
      const user = userData.get({ plain: true });
        res.render('dashboard', {
        user,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

module.exports = router;