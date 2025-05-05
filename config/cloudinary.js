import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Укажите имя вашего Cloudinary аккаунта
  api_key: process.env.CLOUDINARY_API_KEY, // Ваш API ключ
  api_secret: process.env.CLOUDINARY_API_SECRET, // Ваш секретный ключ
});

export default cloudinary;
