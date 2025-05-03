import { decodeToken } from "../utils/tokenGenerate.js";

export async function authenticate (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token is required" });
    }
    const accessToken = authHeader.split(" ")[1];
    try {
        let [decodedAccessToken] = await Promise.all([decodeToken(accessToken)]);
        req.user = decodedAccessToken;
        next();
    }
    catch (err) {
        console.log(err);
        if (err === "TOKEN_EXPIRED") {
            return res.status(401).json({ error: "Access token expired" });
        } else if (err === "TOKEN_INVALID") {
            return res.status(403).json({ error: "Access token invalid" });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
}

export async function chekAdminRole (req, res, next) {
    try {
        const requestTokenData = req.headers.authorization;
        if (!requestTokenData) {
            return res.status(401).json({
                error: "Token is required"
            });
        }
        const accessToken = requestTokenData.split(" ")[1];
        const decodedAccessToken = await decodeToken(accessToken);
        if (!decodedAccessToken) {
            return res.status(401).json({
                error: "Token invalid"
            });
        }
        if (decodedAccessToken.userRole === "admin") {
            next();
        }
        else {
            return res.status(403).json({
                error: "Access denied"
            });
        }
    }
    catch (err) {
        return res.status(401).json({
            error: err.message
        });
    }
}

export async function chekAuthorRole (req, res, next) {
    try {
        const requestTokenData = req.headers.authorization;
        if (!requestTokenData) {
            return res.status(401).json({
                error: "Token is required"
            });
        }
        const accessToken = requestTokenData.split(" ")[1];
        const decodedAccessToken = await decodeToken(accessToken);
        if (!decodedAccessToken) {
            return res.status(401).json({
                error: "Token invalid"
            });
        }
        if (decodedAccessToken.userRole === "author" || decodedAccessToken.userRole === "admin") {
            next();
        }
        else {
            return res.status(403).json({
                error: "Access denied"
            });
        }

    }
    catch (err) {
        return res.status(401).json({
            error: err.message
        });
    }
}