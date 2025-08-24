import jwt from "jsonwebtoken"
import { config } from "../config/envConfig.js"

export const generateToken = (payload) => {
    return jwt.sign(payload, config.jwt.secret, {expiresIn: '1d'})
}
export const verifyJWT = (token) => {
    return jwt.verify(token, config.jwt.secret);
}