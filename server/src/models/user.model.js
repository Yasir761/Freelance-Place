import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    profile: {
      type: {
        public_id:String,
        url:String,
      }
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      lowercase: true,
      trim: true,
    },
    language: {
      type: [String],
    },
    bio: {
      type: String,
      trim: true,
    },
    heading: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// hashing and coparing password...
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.validatePassword = async function (password) {
  const isPasswordValid = await bcrypt.compare(password, this.password);
  return isPasswordValid;
};

UserSchema.methods.generateAccessToken = async function () {
  const accessToken = await jwt.sign(
    { _id: this._id, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  return accessToken;
};

UserSchema.methods.generateRefreshToken = async function () {
  const refreshToken = await jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
  this.refreshToken =  refreshToken;
  return refreshToken;
};

export const User = mongoose.model("User", UserSchema);
