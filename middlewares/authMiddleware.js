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
            return res.status(401).json({ error: "Salom token eskirdi" });
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

export function checkRole(allowedRoles) {
    return function (req, res, next) {
        const userRole = req.user?.userRole;
        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ error: 'Access denied. You do not have permission.' });
        }
        next();
    };
}

