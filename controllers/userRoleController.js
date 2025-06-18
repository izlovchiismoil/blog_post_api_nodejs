import models from "../models/indexModel.js";

export async function createUserRole (req, res) {
    try {
        const requestUserRole = req.body.userRole;
        if (!requestUserRole) {
            return res.status(400).json({
                error: "Params of user role does not exist"
            });
        }
        requestUserRole.title = requestUserRole.title.toLowerCase();
        const createdUserRole = await models.userRole.create(requestUserRole);
        if (!createdUserRole) {
            return res.status(500).json({
                error: "User role not created"
            });
        }
        return res.status(201).json({
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
        const requestUserRoleId = req.params.id;
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
export async function getAllRolesOfUser (req, res) {
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
        const requestUserRoleId = req.params.id;
        const requestUserRole = req.body.userRole;
        if (!requestUserRoleId || !requestUserRole) {
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
        const updatedUserRoleData = await models.userRole.update(requestUserRole, {
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
        return res.status(201).json({
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
        const requestUserRoleId = req.params.id;
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
        const deletedUserRole = await models.userRole.destroy({
            where: {
                id: requestUserRoleId
            }
        });
        if (!deletedUserRole) {
            return res.status(404).json({
                error: "User role does not exist"
            });
        }
        return res.status(201).json({
            deletedUserRoleCount: deletedUserRole
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
}