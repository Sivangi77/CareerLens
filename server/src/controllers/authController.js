import { registerUser, loginUser } from "../services/authService.js";

import { validateSignup, validateLogin } from "../validators/authValidator.js";

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

export const login = async (req, res, next) => {
  try {
    const errors = validateLogin(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            userId: req.userId,
        });
    } catch (error) {
        next(error);
    }
};