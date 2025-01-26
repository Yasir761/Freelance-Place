import ApiError from "./ApiError.js";

const AsyncHandler = (cb) => async (req, res, next) => {
  try {
    await cb(req, res, next);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      statusCode,
      message: error.message || "Internal Server Error",
      errors: error.errors || [],
      data: null,
      success: false,
    });
  }
};

export default AsyncHandler;
