import  { DataTypes } from "sequelize";
import userRoleModel from "./userRoleModel.js";

export default (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profileImage: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        userRoleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: userRoleModel(sequelize, Sequelize),
                key: "id"
            }
        }
    }, { timestamps: true, freezeTableName: true });
    return User;
};