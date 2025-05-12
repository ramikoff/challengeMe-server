import { v2 as cloudinary } from "cloudinary";

export default class CloudinaryStorage {
  _handleFile(req, file, cb) {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          return cb(error);
        }
        cb(null, result);
      }
    );

    file.stream.pipe(uploadStream);
  }
}
