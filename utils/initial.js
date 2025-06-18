import models from "../models/indexModel.js";
import bcryptjs from "bcryptjs";
import fs from "fs";

// export const initialUserRole = {
//     title: "admin",
//     description: "Administrator has all rights",
//     createPost: true,
//     updateOwnPost: true,
//     updateAnyPost: true,
//     deleteOwnPost: true,
//     deleteAnyPost: true,
//     viewOwnPost: true,
//     viewAnyPost: true,
//     publishOwnPost: true,
//     publishAnyPost: true,
//     createUser: true,
//     updateUser: true,
//     updateAnyUser: true,
//     deleteUser: true,
//     deleteAnyUser: true,
//     viewUser: true,
//     viewAnyUser: true,
//     createCategory: true,
//     updateOwnCategory: true,
//     updateAnyCategory: true,
//     deleteOwnCategory: true,
//     deleteAnyCategory: true,
//     viewCategory: true,
//     viewAnyCategory: true,
//     createUserRole: true,
//     updateUserRole: true,
//     deleteUserRole: true,
//     viewUserRole: true,
//     viewAnyUserRole: true,
//     isAdmin: true
// };

// const initialUser = {
//     firstName: "Admin",
//     lastName: "Admin",
//     username: process.env.SUPER_USERNAME || "admin",
//     password: process.env.SUPER_PASSWORD || "admin",
//     imageUrl: null,
//     userRoleId: null
// };

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