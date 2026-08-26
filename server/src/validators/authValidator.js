const validateSignup = ({ name, email, password }) => {
    const errors = {};

    if (!name || !name.trim()) {
        errors.name = "Name is required";
    }

    if (!email || !email.trim()) {
        errors.email = "Email is required";
    }

    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    return errors;
};

export default validateSignup;