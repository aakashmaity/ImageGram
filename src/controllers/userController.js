import { signupUserService, getAllUsersService } from "../services/userService.js"


export async function getUserProfile(req, res) {
    

    return res.json({
        message: "Not implemented"
    })
}
export async function getAllUsers(req, res) {
    const users = await getAllUsersService();

    return res.status(200).json({
        success: true,
        message: "Fetched all users",
        data: users
    })
}

export async function signup(req, res) {
    try {
        const newUser = await signupUserService(req.body)

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser
        })
    } catch (error) {
        if(error?.status) {
            return res.status(error?.status).json({
                success: false,
                message: error?.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}