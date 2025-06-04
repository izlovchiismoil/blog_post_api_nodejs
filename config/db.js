import { Sequelize } from "sequelize";

const sequelize = new Sequelize("blog_post", "postgres", "123456", {
    dialect: "postgres",
    host: process.env.HOST || "localhost",
    port: parseInt(process.env.PORT || 5432)
});


export default sequelize;