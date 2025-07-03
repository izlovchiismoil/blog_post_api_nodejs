import models from "../models/indexModel.js";
import bcryptjs from "bcryptjs";
import fs from "fs";

const initialFileData = JSON.parse(fs.readFileSync("initial.json", "utf8"));

const initialUserRole = Object.keys(initialFileData.userRole).reduce((acc, curr) => {
    return {...acc, ...curr};
},{});

const initialUser = initialFileData.user;


export async function initial () {
    try {
        const rootUserRole = await models.userRole.findOne({
            where: {
                title: "admin"
            },
            raw: true
        });
        if (!rootUserRole) {
            await models.userRole.create(initialUserRole);
        }
        const user = await models.user.findOne({
            where: { username: initialUser.username },
            raw: true
        });
        if (!user) {
            initialUser.userRoleId = rootUserRole.id;
            initialUser.password = await bcryptjs.hash(initialUser.password, 10);
            return await models.user.create(initialUser);
        }
        return user;
    }
    catch (err) {
        console.log(err);
        return process.exit(1);
    }
}