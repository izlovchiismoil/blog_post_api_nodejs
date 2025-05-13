import models from "../models/indexModel.js";
import bcryptjs from "bcryptjs";

export async function createUser (req, res) {
    try {
        const requestUserData = req.body.user;
        if (!requestUserData) {
            return res.status(400).json({
                error: "User params not found"
            });
        }
        requestUserData.username = requestUserData.username.toLowerCase();
        const user = await models.user.findOne({
            attributes: { exclude: ['password'] },
            where: {
                username: requestUserData.username
            }
        });
        if (user) {
            return res.status(409).send({
                error: "User already exists"
            });
        }
        requestUserData.password = await bcryptjs.hash(requestUserData.password, 10);
        requestUserData.role = requestUserData.role.toLowerCase();
        const newUser = await models.user.create(requestUserData);
        const createdUser = newUser.toJSON();
        delete createdUser.username;
        delete createdUser.password;
        delete createdUser.role;
        return res.status(201).json({
            createdUser
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function getUserById (req, res) {
    try {
        const requestUserId = req.params.id;
        if (!requestUserId) {
            return res.status(400).json({
                error: "User params not found"
            });
        }
        const user = await models.user.findByPk(requestUserId, {
            attributes: { exclude: ['password'] },
            raw: true
        });
        if (!user) {
            return res.status(404).send({
                error: "User not found"
            });
        }
        return res.status(200).json({
            user
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function getAllUsers (req, res) {
    try {
        const users = await models.user.findAll({
            attributes: { exclude: ['password'], raw: true },
        });
        if (!users || users.length === 0) {
            return res.status(404).send({
                error: "Users not found"
            });
        }
        return res.status(200).json({
            users
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function updateUser (req, res) {
    try {
        const requestUserId = req.params.id;
        const requestUserData = req.body.user;
        if (!requestUserId || !requestUserData) {
            return res.status(400).json({
                error: "User params not found"
            });
        }
        const user = await models.user.findByPk(requestUserId, { raw: true });
        if (!user) {
            return res.status(404).send({
                error: "User not found"
            });
        }
        if (user.username === "admin") {
            return res.status(403).json({
                error: "You do not have permission to change this user!"
            });
        }
        requestUserData.password = await bcryptjs.hash(requestUserData.password, 10);
        await models.user.update(
            { ...requestUserData },
            {
                where: {
                    id: requestUserId
                }
            }
        );
        const updatedUser = await models.user.findByPk(requestUserId, {
            attributes: { exclude: ['username', 'password', 'role'] },
            raw: true
        });

        return res.status(200).json({
            updatedUser
        });
    }
    catch (err) {
        console.log(err);
    }
}
export async function deleteUser (req, res) {
    try {
        const requestUserId = req.params.id;
        const user = await models.user.findByPk(requestUserId, {
            attributes: { exclude: ['username', 'password', 'role'] },
            raw: true
        });
        if (!user) {
            return res.status(404).send({
                error: "User not found"
            });
        }
        await models.user.destroy({
            where: { id: requestUserId },
        });
        return res.status(200).json({
            user
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
}