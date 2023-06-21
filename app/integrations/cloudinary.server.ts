import { v2 as cloudinary } from "cloudinary";

if (
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUD_NAME ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Missing Cloudinary environment variables");
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };
