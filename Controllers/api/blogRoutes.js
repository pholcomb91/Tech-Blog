const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
    console.log(newBlog)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req,res) => {
    Blog.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((deletedBlog) => {
        res.json(`${deletedBlog} has been deleted`);
    })
    .catch((err) => res.json(err))
})
module.exports = router;