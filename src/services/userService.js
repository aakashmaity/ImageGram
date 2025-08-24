import { createUser, findAllUsers, findUserByEmail } from "../repositories/userRepo.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt.js";

export const signupUserService = async (user) => {
    try {
        const newUser = await createUser(user);
        return newUser;
    } catch (error) {
        console.log(error.message)
        if(error.name === "MongoServerError" && error.code == 11000) {   // 11000 DuplicateKey error (already exists) 
            throw {
                status: 400,
                message: "Username already exists"
            }
        }
        throw error;
    }
}
export const signinUserService = async(userDetails) => {
    try {
        const user = await findUserByEmail(userDetails?.email);

        if(!user){
            throw {
                status: 404,
                message: "User not found. Do register!"
            }
        }

        const isPasswordValid = bcrypt.compareSync(userDetails?.password, user?.password);

        if(!isPasswordValid){
            throw {
                status: 401,
                message: "Incorrect password!"
            }
        }

        const token = generateToken({ email: user.email, _id: user._id, username: user.username});
        return token;

    } catch (error) {
        console.log(error.message)
        throw error;
    }
}
export const checkIfUserExists = async(email) => {
    try {
        const user = await findUserByEmail(email);
        return user;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}
export const getAllUsersService = async() => {
    try {
        const users = await findAllUsers();
        return users;
    } catch (error) {
        console.log(error.message)
        throw error;
    }
}
