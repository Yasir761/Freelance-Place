import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import {
  deleteImageFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { generateProfileByName } from "../utils/profileGeneratort.js";

const signup = AsyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (
    [firstName, lastName, email, password].some((field) => field?.trim() === "" || !field)
  ) {
    throw new ApiError(403, "All fields are required");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(403, "User with this email is already exists");
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    profile: {
      public_id: `${firstName}${lastName}`,
      url: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
    },
    ...req.body
  });
  if (!user) throw new ApiError(401, "User registration failed");

  const { accessToken, refreshToken, userWithToken } =
    await generareAccessRefreshToken(user);
  // cookie...

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  };

  const accessTokenExpiry = 24 * 60 * 60 * 1000; // 1 day
  const refreshTokenExpiry = 7 * 24 * 60 * 60 * 1000; // 7 day

  return res
    .status(200)
    .cookie("accessToken", `Bearer ${accessToken}`, {...options, maxAge:accessTokenExpiry  })
    .cookie("refreshToken", `Bearer ${refreshToken}`, {...options, maxAge:refreshTokenExpiry })
    .json(
      new ApiResponse(200, userWithToken, "User registration successfully.")
    );
});

const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new ApiError(401, "All fields required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User Doesn't exists with this email");

  const isValidPassword = await user.validatePassword(password);
  if (!isValidPassword) throw new ApiError(404, "Password is Invalid");

  const { accessToken, refreshToken, userWithToken } =
    await generareAccessRefreshToken(user);
  // cookie..
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  };

  const accessTokenExpiry = 24 * 60 * 60 * 1000; // 1 day
  const refreshTokenExpiry = 7 * 24 * 60 * 60 * 1000; // 7 day

  return res
    .status(200)
    .cookie("accessToken", `Bearer ${accessToken}`, {...options, maxAge:accessTokenExpiry  })
    .cookie("refreshToken", `Bearer ${refreshToken}`, {...options, maxAge:refreshTokenExpiry  })
    .json(new ApiResponse(200, userWithToken, "User loggedin successfully"));
});

const logout = AsyncHandler(async (req, res) => {
  // remove refresh token from db and clear cookies...
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User Logout successfully"));
});

const generareAccessRefreshToken = async function (user) {
  try {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    await user.save();

    const userWithoutPass = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!userWithoutPass) throw error;

    const userWithToken = { ...userWithoutPass?._doc, accessToken };

    return { accessToken, userWithToken, refreshToken };
  } catch (error) {
    throw new ApiError(403, "Someing went wrong while generating token", error.errors);
  }
};

const generateUserProfileByName = async (req, res) => {
  const { firstName, lastName } = req.query;
  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();

  res.setHeader("Content-Type", "image/svg+xml");

  const userProfileImage = generateProfileByName(initials);
  return res.status(200).send(userProfileImage);
};

const getUserById = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password -refreshToken");
    if (!user) throw error;

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User fetch successfully"));
  } catch (error) {
    throw new ApiError(404, "User doesn't exists with this Id");
  }
});

const updateUser = AsyncHandler(async (req, res) => {
  try {
    const userDetails = { ...req.body };
    delete userDetails?.password;
    const updatedUser = await User.findByIdAndUpdate(req?.user?._id, req.body, {
      new: true,
    }).select("-password -refreshToken");
    if (!updatedUser) throw error;
    return res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "User Update Successfully"));
  } catch (error) {
    throw new ApiError(401, "User can't update, please try again later");
  }
});

const deleteUser = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req?.user?._id });
    if (!user) throw error;

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, null, "User Deleted Successfully"));
  } catch (error) {
    throw new ApiError(
      403,
      "User can't deleted right now plase try again later."
    );
  }
});

const uploadProfile = AsyncHandler(async (req, res) => {
  const file = req.file;

  if (!file) throw new ApiError(401, "Profile Image is missing");

  const uploadProfileResponse = await uploadOnCloudinary(file.path);

  if (!uploadProfileResponse.secure_url)
    throw new ApiError(401, "profile image uploading failed");

  const updateUser = await User.findByIdAndUpdate(
    { _id: req.user?._id },
    {
      $set: {
        profile: {
          public_id: uploadProfileResponse.public_id,
          url: uploadProfileResponse.secure_url,
        },
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  req.user = updateUser;
  const removeOldProfile = await deleteImageFromCloudinary(req.user?.profile);
  return res
    .status(200)
    .json(new ApiResponse(200, updateUser, "File upload successfylly"));
});

const changePassword = AsyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!newPassword || !oldPassword)
    throw new ApiError(401, "Please provide old & new password");

  const user = await User.findById(req.user?._id);
  if (!user) throw new ApiError(403, "Update password failed");

  const validateOldPass = await user.validatePassword(oldPassword);
  if (!validateOldPass) throw new ApiError(401, "Invalid old password");

  const validateNewPass = await user.validatePassword(newPassword);
  if (validateNewPass)
    throw new ApiError(401, "password can't be same as old password");

  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password update successfully"));
});

const regenerateTokens = AsyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken?.split(" ")[1];
  if (!refreshToken) throw new ApiError(401, "Unauthorised access");

  const decodeToken = await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  if (!decodeToken) throw new ApiError(403, "Token expired");

  const user = await User.findById(decodeToken._id);
  if (!user) throw new ApiError(401, "Invalid refresh token");

  if (refreshToken !== user?.refreshToken)
    throw new ApiError(401, "Refresh token is expired or used");

  const {
    accessToken,
    refreshToken: newRefreshToken,
    userWithToken,
  } = await generareAccessRefreshToken(user);

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  };

  const accessTokenExpiry = 24 * 60 * 60 * 1000; // 1 day
  const refreshTokenExpiry = 7 * 24 * 60 * 60 * 1000; // 7 day

  return res
    .status(200)
    .cookie("accessToken", `Bearer ${accessToken}`, {...options, maxAge:accessTokenExpiry  })
    .cookie("refreshToken", `Bearer ${newRefreshToken}`, {...options, maxAge:refreshTokenExpiry  })
    .json(
      new ApiResponse(200, userWithToken, "New Token Generated successfully")
    );
});

export {
  signup,
  login,
  logout,
  getUserById,
  updateUser,
  uploadProfile,
  deleteUser,
  changePassword,
  generateUserProfileByName,
  regenerateTokens,
};
