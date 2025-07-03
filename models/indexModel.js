import sequelize from "../config/db.js";
import { Sequelize } from "sequelize";
import userModel from "./userModel.js";
import userRoleModel from "./userRoleModel.js";
import categoryModel from "./categoryModel.js";
import postModel from "./postModel.js";
import commentModel from "./commentModel.js";
const models = {
    user: userModel(sequelize, Sequelize),
    userRole: userRoleModel(sequelize, Sequelize),
    category: categoryModel(sequelize, Sequelize),
    post:  postModel(sequelize, Sequelize),
    comment: commentModel(sequelize, Sequelize)
};

models.userRole.hasMany(models.user, { foreignKey: "userRoleId" });
models.user.belongsTo(models.userRole, { foreignKey: "userRoleId" });

models.user.hasMany(models.post, { foreignKey: "authorId" });
models.post.belongsTo(models.user, { foreignKey: "authorId" });

models.category.hasMany(models.post, { foreignKey: "categoryId" });
models.post.belongsTo(models.category, { foreignKey: "categoryId" });

models.post.hasMany(models.comment, { foreignKey: "postId" });
models.comment.belongsTo(models.post, { foreignKey: "postId" });


export { sequelize };

export default models;
