import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed."));
    }
};

const uploadResume = multer({
    storage,
    fileFilter,
});

export default uploadResume;