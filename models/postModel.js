import  { DataTypes } from "sequelize";
import userModel from "./userModel.js";
import categoryModel from "./categoryModel.js";

export default (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        shortTitle: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: userModel(sequelize, Sequelize),
                key: "id"
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: categoryModel(sequelize, Sequelize),
                key: "id"
            }
        },
        postImage: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, { timestamps: true, freezeTableName: true });
    return Post;
};