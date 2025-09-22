import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    fullName: {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },

}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function () {
    return jwt.sign({
        _id: this._id,
    }, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRY })
}

const User = mongoose.model("User", userSchema);

export default User;
