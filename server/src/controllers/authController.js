import { registerUser } from "../services/authService.js";
import validateSignup from "../validators/authValidator.js";

export const register = async (req, res, next) => {
    try {
        const errors = validateSignup(req.body);

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                success: false,
                errors,
            });
        }

        const user = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
};