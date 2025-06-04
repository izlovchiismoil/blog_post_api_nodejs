import sequelize from "../config/db.js";
import  { DataTypes } from "sequelize";

const UserRole = sequelize.define("user_roles", {
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
        type: DataTypes.TEXT,
        allowNull: true
    },
    createPost: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    updateOwnPost: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    updateAnyPost: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    deleteOwnPost: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    deleteAnyPost: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    viewOwnPost: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    viewAnyPost: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    publishOwnPost: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    publishAnyPost: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    updateUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    updateAnyUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    deleteUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    deleteAnyUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    viewUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    viewAnyUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createCategory: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    updateOwnCategory: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    updateAnyCategory: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    deleteOwnCategory: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    deleteAnyCategory: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    viewCategory: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    viewAnyCategory: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createUserRole: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    updateUserRole: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    deleteUserRole: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    viewUserRole: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    viewAnyUserRole: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, { timestamps: true, freezeTableName: true });

export default UserRole;