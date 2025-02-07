import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyToken = AsyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken?.split("Bearer ")[1] ||
      req.header("Authorization")?.split("Bearer ")[1];

    if (!token) throw new ApiError(401, "Unauthorized request");

    const decodeUserFromToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodeUserFromToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(401, "Invalid Access Token");
    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid Access Token");
  }
});
