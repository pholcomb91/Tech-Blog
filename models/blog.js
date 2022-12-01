const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    topic: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    // blog_date: {
    //   type: DataTypes.DATEONLY,
    // }
  },
  {
    sequelize,
    timestamps: true,
    createdAt: true,
    updatedAt: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
  }
);

module.exports = Blog;