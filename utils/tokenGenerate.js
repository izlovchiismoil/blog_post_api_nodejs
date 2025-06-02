import jwt from "jsonwebtoken";
export function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_EXPIRE });
}
export function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.REFRESH_EXPIRE });
}
export function decodeToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
            if (err) {
                return err;
            }
            return decoded;
        });
}