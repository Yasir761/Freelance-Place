import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const uploadedFile = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(filePath);
    return uploadedFile;
  } catch (error) {
    fs.unlinkSync(filePath);
    throw new error;
  }
};

export const deleteImageFromCloudinary = async (profile) => {
  try {
    if (!profile.public_id) return null;

    const deletedFile = await cloudinary.uploader.destroy(profile.public_id);
    return deletedFile;
  } catch (error) {
    throw new error;
  }
};
