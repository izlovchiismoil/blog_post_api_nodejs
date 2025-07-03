import  { DataTypes } from "sequelize";
import postModel from "./postModel.js";

export default (sequelize, Sequelize) => {
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
                model: postModel(sequelize,  Sequelize),
                key: "id"
            }
        }
    }, { timestamps: true, freezeTableName: true });
    return Comment;
};