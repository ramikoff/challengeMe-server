import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "challenges", // Папка в Cloudinary, куда будут загружаться изображения
    allowed_formats: ["jpg", "jpeg", "png"], // Разрешённые форматы файлов
  },
});

const upload = multer({ storage });

export default upload;
