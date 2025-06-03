import { Sequelize } from "sequelize";

console.log("Baza paroli: ", process.env.DB_PASSWORD);

const sequelize = new Sequelize("blog_post", "postgres", "123456", {
    dialect: "postgres",
    host: process.env.HOST || "localhost",
    port: parseInt(process.env.PORT || 5432)
});


export default sequelize;