import  { DataTypes } from "sequelize";

export default (sequelize, Sequelize) => {
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

    return Category;
};