import { checkIfUserExists } from "../services/userService.js";
import { verifyJWT } from "../utils/jwt.js";

export const isAuthenticated = async(req, res, next) => {
    // Prefer Authorization header with Bearer token; fallback to authToken cookie
    let token = req.headers?.authorization || req.cookies?.authToken;
    // Normalize Bearer token format
    if (typeof token === 'string' && token.startsWith('Bearer ')) {
        token = token.slice(7).trim();
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Token is required. Login again!" });
    }

    // Verify token
    try {
        const response = verifyJWT(token);

        // console.log("Verified user in auth middleware:", response)
        const doesUserExists = await checkIfUserExists(response?.email);

        if(!doesUserExists){
            return res.status(404).json({
                success: false,
                message: "User not exists"
            })
        }

        req.user = response;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        })
    }
}
export const isAdmin = async(req, res, next) => {
    if(req?.user?.role != "admin"){
        return res.status(401).json({
            success: false,
            message: "Unauthorized - You don't have permission"
        })
    }
    next();
}