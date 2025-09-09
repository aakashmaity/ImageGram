import { signupUserService, getAllUsersService, signinUserService, findUserByIdService } from "../services/userService.js"


export async function getUserProfile(req, res) {
    try {
        const { id } = req.params
        console.log("User id from params:", id)
        const user = await findUserByIdService(id);

        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            user
        })
    } catch (error) {
        if (error?.status) {
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
export async function getAllUsers(req, res) {
    try {
        const users = await getAllUsersService();

        return res.status(200).json({
            success: true,
            message: "Fetched all users",
            data: users
        })
    } catch (error) {
        if (error?.status) {
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

export async function signup(req, res) {
    try {
        const { newUser, token } = await signupUserService(req.body)

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser,
            token: token
        })
    } catch (error) {
        if (error?.status) {
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
export async function signin(req, res) {
    try {
        const token = await signinUserService(req.body);

        // Set the authentication token as a cookie in the response
        return res.status(200).json({
            success: true,
            message: "User signed in successfully",
            token: token
        })
    } catch (error) {
        if (error?.status) {
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
