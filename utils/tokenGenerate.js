import jwt from "jsonwebtoken";
export function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_EXPIRE });
}
export function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.REFRESH_EXPIRE });
}
export function decodeToken(token) {
    return new Promise(( resolve, reject ) => {
        jwt.verify(token, process.env.JWT_SECRET, {},(err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    reject(new Error("TOKEN_EXPIRED"));
                }
                else {
                    reject(new Error("TOKEN_INVALID"));
                }
            } else {
                resolve(decoded);
            }
        });
    });
}