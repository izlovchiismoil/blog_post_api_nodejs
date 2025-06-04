import models from "../models/indexModel.js";
import bcryptjs from "bcryptjs";

const defaultUserRole = {
    title: "admin",
    description: "Administrator has all rights",
    createPost: true,
    updateOwnPost: true,
    updateAnyPost: true,
    deleteOwnPost: true,
    deleteAnyPost: true,
    viewOwnPost: true,
    viewAnyPost: true,
    publishOwnPost: true,
    publishAnyPost: true,
    createUser: true,
    updateUser: true,
    updateAnyUser: true,
    deleteUser: true,
    deleteAnyUser: true,
    viewUser: true,
    viewAnyUser: true,
    createCategory: true,
    updateOwnCategory: true,
    updateAnyCategory: true,
    deleteOwnCategory: true,
    deleteAnyCategory: true,
    viewCategory: true,
    viewAnyCategory: true,
    createUserRole: true,
    updateUserRole: true,
    deleteUserRole: true,
    viewUserRole: true,
    viewAnyUserRole: true,
    isAdmin: true
};

const defaultUser = {
    firstName: "Admin",
    lastName: "Admin",
    username: process.env.SUPER_USERNAME || "admin",
    password: process.env.SUPER_PASSWORD || "admin",
    imageUrl: null,
    userRoleId: null
};

export async function defaults () {
    try {
        const adminUserRole = await models.userRole.findOne({
            where: {
                title: "admin"
            },
            raw: true
        });
        if (!adminUserRole) {
            await models.userRole.create(defaultUserRole);
        }
        const user = await models.user.findOne({
            where: { username: defaultUser.username },
            raw: true
        });
        if (!user) {
            defaultUser.userRoleId = adminUserRole.id;
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