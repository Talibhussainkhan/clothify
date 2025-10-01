import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
     transformation: [
      {
        width: 1280,   // max width 1280px
        quality: "auto:low", // auto compression (Cloudinary AI)
        fetch_format: "webp", // webp usually smallest
      },
    ],
  },
});

export const upload = multer({ storage });
