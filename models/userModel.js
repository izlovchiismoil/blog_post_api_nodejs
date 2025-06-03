import sequelize from "../config/db.js";
import  { DataTypes } from "sequelize";
import UserRole from "./userRoleModel.js";
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
            model: UserRole,
            key: "id"
        }
    }
}, { timestamps: true, freezeTableName: true });

export default User;