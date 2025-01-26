
import { Category } from "../models/category.model.js";
import { Gig } from "../models/gig.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import {
  deleteImageFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const getAllCategories = AsyncHandler(async (req, res) => {
  const allCategories = await Category.find();
  return res
    .status(200)
    .json(
      new ApiResponse(200, allCategories, "All categories fetched successfully")
    );
});

const getSingleCategory = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const currentCategory = await Category.findById(id)
  .populate({
    path:"allGigs",
    populate:[
      { 
        path: 'author', 
        select:"firstName lastName profile" 
      },
      { 
        path: 'services', 
        select:"price" 
       }
    ]
  });
  if (!currentCategory) throw new ApiError(404, "Category not found.");

  return res
    .status(200)
    .json(new ApiResponse(200, currentCategory, "Category fetched successfully"));
});

const addNewCategory = AsyncHandler(async (req, res) => {
  if (!req.body?.name || !req.body?.description)
    throw new ApiError(403, "Category name and description is required");

  const newCategory = { ...req.body, createdBy: req.user?._id };

  if (req.file) {
    const filePath = req.file.path;
    if (!filePath) throw new ApiError(403, "Missing cover image path");

    const uploadedCoverImage = await uploadOnCloudinary(filePath);
    if (!uploadedCoverImage.secure_url)
      throw new ApiError(401, "Cover Image uploading failed");
    newCategory.coverPicture = {
      public_id: uploadedCoverImage.public_id,
      url: uploadedCoverImage.secure_url,
    };
  }

  const newCreatedCategory = await Category.create(newCategory);
  if (!newCreatedCategory) throw new ApiError(403, "Add new category failed");

  return res
    .status(200)
    .json(
      new ApiResponse(200, newCreatedCategory, "Category created successfully")
    );
});

const updateCategoryDetails = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const categoryInfo = { ...req.body };
  const currentCat = await Category.findById(id);

  if ( `${req?.user?._id}` !== `${currentCat?.createdBy?._id}`)
    throw new ApiError(401, "Unauthorized access.");

  if (req.file) {
    const filePath = req.file.path;
    if (!filePath) throw new ApiError(401, "Can't find cover image path");

    const uploadedCoverImage = await uploadOnCloudinary(filePath);
    if (!uploadedCoverImage.secure_url)
      throw new ApiError(401, "Cover Image uploading failed");

    categoryInfo.coverPicture = {
      public_id: uploadedCoverImage.public_id,
      url: uploadedCoverImage.secure_url,
    };

    const deletedOld = await deleteImageFromCloudinary(
      currentCat?.coverPicture
    );
  }

  const updatedCat = await Category.findByIdAndUpdate(
    { _id: id },
    categoryInfo,
    { new: true }
  );
  if (!updatedCat) throw new ApiError(401, "Updating category failed");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedCat, "Category updated successfully"));
});

const deleteCategory = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) throw new ApiError(404, "Category not found");

  if (String(req?.user?._id) !== String(category.createdBy?._id))
    throw new ApiError(401, "You can only deleted the category that created by you.");

  await Category.deleteOne({ _id: category?._id });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Category deleted Successfully"));
});

export {
  getAllCategories,
  getSingleCategory,
  addNewCategory,
  updateCategoryDetails,
  deleteCategory,
};
