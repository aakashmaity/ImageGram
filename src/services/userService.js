import { createUser, findAllUsers, findSearchUsersRepo, findUserByEmail, findUserById } from "../repositories/userRepository.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt.js";

export const signupUserService = async (user) => {
    try {
        const newUser = await createUser(user);

        const token = generateToken({ fullname: newUser.fullname, email: newUser.email, _id: newUser._id, username: newUser.username, role: newUser.role || 'user' });
        return { token, newUser };
    } catch (error) {
        console.log(error)
        if (error.name === "MongoServerError" && error.code == 11000) {   // 11000 DuplicateKey error (already exists) 
            throw {
                status: 400,
                success: false,
                message: "Username already exists"
            }
        }
        throw error;
    }
}
export const signinUserService = async (userDetails) => {
    try {
        const user = await findUserByEmail(userDetails?.email);

        if (!user) {
            throw {
                status: 404,
                success: false,
                message: "User not found. Do register!"
            }
        }

        const isPasswordValid = bcrypt.compareSync(userDetails?.password, user?.password);

        if (!isPasswordValid) {
            throw {
                status: 401,
                success: false,
                message: "Incorrect password!"
            }
        }

        const token = generateToken({ fullname: user.fullname, email: user.email, _id: user._id, username: user.username, role: user.role || 'user' });
        return token;

    } catch (error) {
        console.log(error)
        throw error;
    }
}
export const checkIfUserExists = async (email) => {
    try {
        const user = await findUserByEmail(email);
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getAllUsersService = async () => {
    try {
        const users = await findAllUsers();
        return users;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
export const findUserByIdService = async (id) => {
    try {
        const user = await findUserById(id);
        if (!user) {
            throw {
                status: 404,
                success: false,
                message: "User not found"
            }
        }
        return user;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const getSearchUsersService = async (search, offset, limit) => {
    try {
        const { users, totalDocuments } = await findSearchUsersRepo(search, offset, limit);
        return { users, totalDocuments };
    } catch (error) {
        console.log(error)
        throw error;
    }
}