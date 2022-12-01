const Comment = require('./comment');
const Blog = require('./blog');
const User = require('./user');

Blog.hasMany(Comment, {
    foreignKey: 'blog_id'
});

Comment.belongsTo(Blog);

User.hasMany(Blog, {
    foreignKey: 'user_id'
});

Blog.belongsTo(User);

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User);

module.exports = {Comment, Blog, User};


