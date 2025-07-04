import models from "../models/indexModel.js";
import bcryptjs from "bcryptjs";
import fs from "fs";

const initialFileData = JSON.parse(fs.readFileSync("initial.json", "utf8"));


const flattenObject = (obj, result = {}) => {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            flattenObject(obj[key], result);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
};

const initialUserRole = flattenObject(initialFileData.userRole);

const initialUser = initialFileData.user;


export async function initial () {
    try {
        let rootUserRole = await models.userRole.findOne({
            where: {
                title: "admin"
            },
            raw: true
        });
        if (!rootUserRole) {
            rootUserRole = await models.userRole.create(initialUserRole);
        }
        const user = await models.user.findOne({
            where: { username: initialUser.username },
            raw: true
        });
        if (!user) {
            initialUser.userRoleId = parseInt(rootUserRole.id);
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