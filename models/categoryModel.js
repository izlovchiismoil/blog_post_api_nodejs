import sequelize from '../config/db.js';
import  { DataTypes } from 'sequelize';

const Category = sequelize.define("categories", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { freezeTableName: true, timestamps: true });

export default Category;