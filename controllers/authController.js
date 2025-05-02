import models from "../models/indexModel.js";
import bcryptjs from "bcryptjs";
import {
    decodeToken,
    generateAccessToken,
    generateRefreshToken
} from "../utils/tokenGenerate.js";

export async function loginUser(req, res) {
    try {
        const requestUserData = req.body.user;
        if (!requestUserData) {
            return res.status(401).json({
                error: "Params of User not found"
            });
        }
        const user = await models.user.findOne({
            where: { username: requestUserData.username },
            raw: true
        });
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        const isMatch = await bcryptjs.compare(requestUserData.password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                error: 'Invalid credentials'
            });
        }
        const accessToken = generateAccessToken({ userId: user.id, userRole: user.role });
        const refreshToken = await generateRefreshToken({ userId: user.id, userRole: user.role });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/auth"
        });
        return res.status(200).json({
            accessToken
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: err.message
        });
    }
}

export async function logoutUser(req, res) {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/auth"
        });
        return res.status(200).json({
            message: "Logged out successfully"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({
            error: err.message
        });
    }
}

export async function refreshToken(req, res) {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token required" });
    }

    try {
        const decodedToken = await decodeToken(refreshToken);

        const newAccessToken = generateAccessToken({ userId: decodedToken.id, userRole: decodedToken.userRole });

        return res.status(200).json({ accessToken: newAccessToken });

    } catch (err) {
        console.log(err);
        if (err === "REFRESH_TOKEN_EXPIRED") {
            return res.status(401).json({ error: "Refresh token expired" });
        } else if (err === "REFRESH_TOKEN_INVALID") {
            return res.status(403).json({ error: "Refresh token invalid" });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
}