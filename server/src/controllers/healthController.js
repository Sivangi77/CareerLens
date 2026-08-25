export const getHealth = (req, res) => {
    res.status(200).json({
        success: true,
        message: "CareerLens API is running"
    });
};