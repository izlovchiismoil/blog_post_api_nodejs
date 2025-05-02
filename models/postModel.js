import sequelize from '../config/db.js';
import User from '../models/userModel.js';
import  { DataTypes } from 'sequelize';
import Category from "./categoryModel.js";
const Post = sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { timestamps: true, freezeTableName: true });

export default Post;