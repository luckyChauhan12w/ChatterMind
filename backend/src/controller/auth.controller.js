import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import User from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {

    const { email, password, fullName: { firstName, lastName } } = req.body;

    if (!email || !password || !firstName || !lastName) {
        throw new ApiError(400, "All fields are required");
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        throw new ApiError(400, "User already exists");
    }

    const user = await User.create({
        email,
        password,
        fullName: {
            firstName,
            lastName
        }
    })

    const token = user.generateToken();

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
    })

    res.status(201).json(new ApiResponse(201, "User registered successfully", user));
});

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    // console.log(email)
    // console.log(password)

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ApiError(400, "Invalid credentials");
    }

    const isPasswordMatch = await user.isPasswordCorrect(password);

    if (!isPasswordMatch) {
        throw new ApiError(400, "Invalid credentials");
    }

    const token = user.generateToken();

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
    })

    return res.status(200).json(new ApiResponse(200, "User logged in successfully", user));
});

export { registerUser, loginUser }