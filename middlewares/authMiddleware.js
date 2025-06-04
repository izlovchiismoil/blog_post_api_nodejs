import { decodeToken } from "../utils/tokenGenerate.js";
import models from "../models/indexModel.js";

export async function authenticate (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token is required" });
    }
    const accessToken = authHeader.split(" ")[1];
    try {
        let [decodedAccessToken] = await Promise.all([decodeToken(accessToken)]);

        if (decodedAccessToken.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired" });
        }
        const user = await models.user.findByPk(decodedAccessToken.userId, { raw: true});
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

export function checkPermission (allowedPermissions) {
    return async function (req, res, next) {
        const userRoleId = req.user?.userRoleId;
        if (!userRoleId) {
            return res.status(401).json({
                error: "Not authorized"
            });
        }
        const userRole = await models.userRole.findByPk(userRoleId,{ raw: true});
        if (!userRole) {
            return res.status(401).json({
                error: "Not authorized"
            });
        }
        if (!userRole.isAdmin) {
            if (!allowedPermissions.every((allowedPermission) => userRole[allowedPermission] === true)) {
                allowedPermissions.every((allowedPermission) => {
                    // console.log("Allowed permission: ",allowedPermission);
                    // console.log("Allowed permission value: ",userRole[allowedPermission]);
                    return userRole[allowedPermission] === true;
                });
                return res.status(403).json({
                    error: "Access denied"
                });
            }
        }
        next();
    };
}

