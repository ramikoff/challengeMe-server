import multer from "multer";
import ErrorResponse from "../utils/ErrorResponse.js";
import CloudinaryStorage from "../services/cloudinary.js";

// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     const originName = file.originalname;
//     const randomNumber = Math.floor(Math.random() * 1e9);
//     const resultFileName = `${Date.now()}${randomNumber}-${originName}`;
//     cb(null, resultFileName);
//   },
// });

// const storage = multer.memoryStorage();
const storage = new CloudinaryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ErrorResponse("Only image files are allowed!", 409), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
