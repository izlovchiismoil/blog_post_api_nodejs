import sequelize from '../config/db.js';
import  { DataTypes } from 'sequelize';
const User = sequelize.define('users', {
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
    userRole: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { timestamps: true, freezeTableName: true });

export default User;