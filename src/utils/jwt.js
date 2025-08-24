import jwt from "jsonwebtoken"
import { config } from "../config/envConfig.js"

export const generateToken = (payload) => {
    return jwt.sign(payload, config.jwt.secret, {expiresIn: '1d'})
}