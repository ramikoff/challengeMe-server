import { v2 as cloudinary } from "cloudinary";
import CloudinaryStorage from "../services/cloudinary.js";

import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "challenge-me-images",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

export default upload;
