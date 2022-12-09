const router = require('express').Router();
const { Comment, Blog, User } = require('../models');
const withAuth = require('../utils/auth');
const userId = 1;

//getting all blog posts
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: [
                Comment,
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
//get a single blog based on req
router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        const specificBlog = await Blog.findByPk(req.params.id, {
            include: [
                User, {model: Comment, include: [User]}
            ],
        }); 
        const blog = specificBlog.get({ plain: true });
        console.log(blog);
        res.render('blogpost', {
            blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }   
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // TODO: findAll Blogs and the narrow down by user_id
      // Find the logged in user based on the session ID
    const userData = await Blog.findAll({
        where: {user_id: req.session.user_id},
        include: [
            {
                model: User,
                attributes: { exclude: ['password'] },
            },
            Comment
        ],
    });
        console.log(userData);
        const user = userData.get({ plain: true });
        console.log(user);
        res.render('dashboard', {user, logged_in: req.session.logged_in});
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
        
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login')
});
    



module.exports = router;