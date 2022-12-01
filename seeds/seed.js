const sequelize = require('../config/connection');
const { Comment, Blog, User, Topic } = require('../models');

const commentData = require('./commentData.json');
const blogData = require('./blogData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    });
  }

  process.exit(0);
};

seedDatabase();