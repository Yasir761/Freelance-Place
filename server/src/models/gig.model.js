import mongoose, { Schema } from "mongoose";

const gigSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],
    },
    coverPicture: {
      type: {
        public_id: String,
        url: String,
      },
      required: true,
    },
    images: {
      type: [
        {
          public_id: String,
          url: String,
        },
      ],
    },
    tags: {
      type: { experties: [String] },
      // required: true,
    },
    services: {
      type: Schema.Types.ObjectId,
      ref: "GigService",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      totalStars: {
        type: Number,
        default: 0,
      },
      starNumber: {
        type: Number,
        default: 0,
      },
    },
    sales: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Gig = mongoose.model("Gig", gigSchema);
