import { createUser, findAllUsers } from "../repositories/userRepo.js"

export const signupUserService = async (user) => {
    try {
        const newUser = await createUser(user);
        return newUser;
    } catch (error) {
        if(error.name === "MongoServerError" && error.code == 11000) {   // 11000 DuplicateKey error (already exists) 
            throw {
                status: 400,
                message: "Username already exists"
            }
        }
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