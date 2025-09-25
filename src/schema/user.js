import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minLength: 3
    },
    avtar: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        validate: {
            validator: function (emailValue) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
            },
            message: props => `${props.value} is Invalid email format`
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
}, { timestamps: true })


// Triggers
userSchema.pre('save', function modifyPassword(next) {
    const user = this;

    const salt = bcrypt.genSaltSync(9);
    const hashedPassword = bcrypt.hashSync(user.password, salt)

    user.password = hashedPassword;

    next();
})


const User = mongoose.model("User", userSchema);

export default User;