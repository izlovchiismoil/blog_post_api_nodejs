import models from "../models/indexModel.js";

export async function createUserRole (req, res) {
    try {
        const requestUserRole = req.body.userRole;
        if (!requestUserRole) {
            return res.status(400).send({
                error: "Params of user role does not exist"
            });
        }
        const createdUserRole = await models.userRole.create(requestUserRole);
        if (!createdUserRole) {
            return res.status(422).send({
                error: "User role not created"
            });
        }
        return res.status(201).send({
            createdUserRole
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function getUserRoleById (req, res) {
    try {
        const requestUserRoleId = req.body.userRoleId;
        if (!requestUserRoleId) {
            return res.status(400).json({
                error: "Params of user role id does not exist"
            });
        }
        const userRole = await models.userRole.findByPk(requestUserRoleId, { raw: true });
        if (!userRole) {
            return res.status(404).json({
                error: "User role does not exist"
            });
        }
        return res.status(200).json({
            userRole
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function getAllUserRoles (req, res) {
    try {
        const userRoles = await models.userRole.findAll({ raw: true });
        if (!userRoles) {
            return res.status(404).json({
                error: "User roles does not exist"
            });
        }
        return res.status(200).json({
            userRoles
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function updateUserRole (req, res) {
    try {
        const requestUserRoleId = req.params.userRoleId;
        const requestUserRoleData = req.params.userRoleData;
        if (!requestUserRoleId) {
            return res.status(400).json({
                error: "Params of user role does not exist"
            });
        }
        const userRole = await models.userRole.findByPk(requestUserRoleId);
        if (!userRole) {
            return res.status(404).json({
                error: "User role does not exist"
            });
        }
        const updatedUserRoleData = await models.userRole.update(requestUserRoleData, {
            where: {
                id: requestUserRoleId
            }
        });
        if (!updatedUserRoleData) {
            return res.status(404).json({
                error: "User role does not updated"
            });
        }
        const updatedUserRole = await models.userRole.findByPk(requestUserRoleId);
        return res.status(201).send({
            updatedUserRole
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function deleteUserRole (req, res) {
    try {
        const requestUserRoleId = req.params.userRoleId;
        if (!requestUserRoleId) {
            return res.status(400).json({
                error: "Params of user role does not exist"
            });
        }
        const userRole = await models.userRole.findByPk(requestUserRoleId);
        if (!userRole) {
            return res.status(404).json({
                error: "User role does not exist"
            });
        }
        const deletedUserRole = await models.userRole.destroy(requestUserRoleId);
        if (!deletedUserRole) {
            return res.status(404).json({
                error: "User role does not exist"
            });
        }
        return res.status(201).send({
            deletedUserRole
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
}