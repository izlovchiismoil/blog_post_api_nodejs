import sequelize from '../config/db.js';
import  { DataTypes } from 'sequelize';
import Post from "./postModel.js";

const Comment = sequelize.define("comments", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    commenterName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        reference: {
            model: Post,
            key: 'id'
        }
    }
}, { timestamps: true, freezeTableName: true });

export default Comment;