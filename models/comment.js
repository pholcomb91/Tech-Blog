const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            primaryKey: true,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        blog_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'blog',
                key: 'id',
            },
        },
        comment_date: {
            type: DataTypes.DATEONLY,
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment', 
    }
)

module.exports = Comment;