import { Category } from "../models/category.model.js";
import { Gig } from "../models/gig.model.js";
import { GigService } from "../models/gigService.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import {
  deleteImageFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const getGigDetails = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const gigDetails = await Gig.findById(id)
    .populate("services")
    .populate({
      path: "author",
      select: "-password -refreshToken",
    })
    .populate({
      path: "category",
      select: "name",
    });
  if (!gigDetails)
    throw new ApiError(404, "This gig may be deleted or move to another page.");

  return res
    .status(200)
    .json(new ApiResponse(200, gigDetails, "Gig fetch successfully"));
});

const parseStringToObject = (data) => {
  return typeof data === "string" ? JSON.parse(data) : data;
};

const cloudinaryImageUploader = async (imgPath) => {
  const result = await uploadOnCloudinary(imgPath);
  if (!result) throw new ApiError(403, "File uploading failed");

  return {
    public_id: result?.public_id,
    url: result?.secure_url,
  };
};

const addNewGig = AsyncHandler(async (req, res) => {
  const gigDetails = { ...req.body };
  if (Object.entries(gigDetails).some((property) => property[1] === ""))
    throw new ApiError(403, "Please provide all the required details");

  const { services, tags, keywords, images } = gigDetails;

  const gigService = parseStringToObject(services);
  const currentGigService = await GigService.create(gigService);
  if (!currentGigService)
    throw new ApiError(402, "Gig srevice details missing");

  const gigCoverPicture = req?.files?.coverPicture[0];
  if (!gigCoverPicture) throw new ApiError(404, "Can't found Cover picture");

  const uploadedCoverPicture = await cloudinaryImageUploader(
    gigCoverPicture.path
  );

  const gigImages = req.files?.images;
  let uploadedGigImages = [];

  if (gigImages && gigImages.length > 0) {
    uploadedGigImages = await Promise.all(
      gigImages.map(async (img) => {
        const result = await cloudinaryImageUploader(img.path);
        return result;
      })
    );
  }

  // parse values...
  const gigTags = parseStringToObject(tags);
  const gigKeywords = parseStringToObject(keywords);

  // set parse values...
  gigDetails.tags = gigTags;
  gigDetails.keywords = gigKeywords;
  gigDetails.author = req.user?._id;
  gigDetails.services = currentGigService?._doc?._id;
  gigDetails.coverPicture = uploadedCoverPicture;
  gigDetails.images = uploadedGigImages;

  const newGig = await Gig.create(gigDetails);
  if (!newGig) throw new ApiError(402, "Gig srevice details missing");

  const currentCat = await Category.findByIdAndUpdate(newGig?.category);
  currentCat.allGigs.push(newGig?._id);
  await currentCat.save();

  return res
    .status(200)
    .json(new ApiResponse(200, newGig, "Add New Gig successfully."));
});

const updateGigDetails = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const gigDetails = { ...req.body };
  if (Object.entries(gigDetails).some((property) => property[1] === ""))
    throw new ApiError(403, "Details can't be empty");

  const updatedDetails = await Gig.findByIdAndUpdate({ _id: id }, gigDetails, {
    new: true,
  });

  if (!updatedDetails) throw new ApiError(403, "Gig update failed");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedDetails, "update gig details."));
});

const updateGigServicesDetails = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const gigServicesDetails = { ...req.body };
  if (Object.entries(gigServicesDetails).some((property) => property[1] === ""))
    throw new ApiError(403, "Details can't be empty");
  const gig = await Gig.findById(id);
  const updatedServicesDetails = await GigService.findByIdAndUpdate(
    { _id: gig?.services },
    gigServicesDetails,
    { new: true }
  );

  if (!updatedServicesDetails)
    throw new ApiError(403, "Gig service update failed");

  const updatedGigWithServices = await Gig.findById(id).populate("services");
  if (!updatedGigWithServices) throw new ApiError(403, "Gig update failed");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedGigWithServices,
        "update gig services details."
      )
    );
});

const updateGigImages = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { coverPicture, images } = req.files;

  const gigDetails = await Gig.findById(id);
  const newGigImages = {};

  if (coverPicture) {
    newGigImages.coverPicture = await cloudinaryImageUploader(
      coverPicture[0].path
    );
    await deleteImageFromCloudinary(gigDetails.coverPicture);
  }

  if (images) {
    newGigImages.images = await Promise.all(
      images.map(async (img) => await cloudinaryImageUploader(img.path))
    );

    await Promise.allSettled(
      gigDetails?.images?.map(
        async (img) => await deleteImageFromCloudinary(img)
      )
    );
  }

  const updateGigWithNewImages = await Gig.findByIdAndUpdate(
    { _id: id },
    newGigImages,
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updateGigWithNewImages,
        "update gig services details."
      )
    );
});

const deleteGig = AsyncHandler(async (req, res) => {
  const { id } = req.body;
  const gigDetails = await Gig.findByIdAndDelete({ _id: id });
  if (!gigDetails) throw new ApiError(404, "Gig not found.");

  const result = await deleteImageFromCloudinary(gigDetails?.coverPicture);

  if (gigDetails?.images?.length > 0) {
    const result = await Promise.all(
      gigDetails.images.map(async (img) => await deleteImageFromCloudinary(img))
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, gigDetails, "Gig Deleted successfully."));
});

const deleteImageFromGig = AsyncHandler(async (req, res) => {
  const { id, imageId } = req.params;
  const gigDetails = await Gig.findById(id);
  if (!gigDetails) throw new ApiError(404, "Gig not found.");

  const images = gigDetails?.images;
  if (images.length <= 0) throw new ApiError(404, "Gig can't have images");

  const imageToBeDeleted = images.find((img) => img.public_id === imageId);
  if (!imageToBeDeleted) throw new ApiError(404, "Image not found");

  const restImages = images.filter((img) => img.public_id !== imageId);

  const updatedGig = await Gig.findByIdAndUpdate(
    { _id: id },
    {
      images: restImages,
    },
    { new: true }
  );
  if (!updatedGig) throw new ApiError(404, "Failed to delete image");

  const deletedImage = await deleteImageFromCloudinary(imageToBeDeleted);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedGig, "Image deleted successfully"));
});

const getAllGigs = AsyncHandler(async (req, res) => {
  const filter = { author: req.user?._id };

  const allGigs = await Gig.find(filter).populate("services");
  return res
    .status(200)
    .json(new ApiResponse(200, allGigs, "Fetch all gigs successfully."));
});

export {
  getGigDetails,
  addNewGig,
  updateGigDetails,
  updateGigServicesDetails,
  updateGigImages,
  deleteGig,
  deleteImageFromGig,
  getAllGigs,
};
