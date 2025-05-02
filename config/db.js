import { Sequelize } from 'sequelize';

const sequelize = new Sequelize("blog_post", "postgres", "123456", {
    dialect: 'postgres',
    host: "localhost",
    port: 5432
});
export default sequelize;