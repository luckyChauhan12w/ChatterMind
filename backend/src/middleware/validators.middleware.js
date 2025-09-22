import { body } from "express-validator";

const registerValidator = [
    body("email")
        .isEmail().withMessage("Invalid email address")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("fullName.firstName")
        .notEmpty().withMessage("First name is required"),
    body("fullName.lastName")
        .notEmpty().withMessage("Last name is required"),
];

const loginValidator = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
];


export { registerValidator, loginValidator }