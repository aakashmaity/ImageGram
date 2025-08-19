import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        validate: {
            validator: function(emailValue) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
            },
            message: props => `${props.value} is Invalid email format`
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;