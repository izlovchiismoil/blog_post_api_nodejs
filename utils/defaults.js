import models from "../models/indexModel.js";
import bcryptjs from "bcryptjs";

const defaultUser = {
    firstName: "Admin",
    lastName: "Admin",
    username: process.env.SUPER_USERNAME || "admin",
    password: process.env.SUPER_PASSWORD || "admin",
    imageUrl: null,
    role: "admin"
};

export async function defaults () {
    try {
        const user = await models.user.findOne({
            where: { username: defaultUser.username },
            raw: true
        });
        if (!user) {
            defaultUser.password = await bcryptjs.hash(defaultUser.password, 10);
            return await models.user.create(defaultUser);
        }
        return user;
    }
    catch (err) {
        console.log(err);
        return process.exit(1);
    }
}