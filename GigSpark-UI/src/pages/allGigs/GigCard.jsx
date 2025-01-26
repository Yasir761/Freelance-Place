import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import StarRating from "../../components/ui/StarRating";
import LikeButton from "../../components/ui/LikeButton";
import RecommendationTag from "../../components/ui/RecommendationTag";

const GigCard = ({ data }) => {
  if (!data) {
    return <h1>Loading...</h1>;
  }

  const {
    _id,
    images,
    coverPicture,
    author: { firstName, lastName, profile },
    title,
    services,
    rating,
  } = data;

  return (
    <div className="relative w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {data?.isRecommended && <RecommendationTag />}
      <Link to={`/gig/${_id}`} className="relative">
        <img
          className="rounded-t-lg object-cover w-full aspect-video border-4 border-gray-100"
          src={coverPicture?.url}
          alt="product image"
        />
        <LikeButton className="absolute top-2 right-2" />
      </Link>
      <div className="px-4 py-3 pb-5">
        <div className="flex gap-2 items-center justify-between">
          <Link to={`/profile/${data?.author?._id}`} className="flex gap-2 py-2">
            <span>
              <img
                className="rounded-full h-6 w-6"
                src={profile?.url}
                alt="product image"
              />
            </span>
            <span className="text-sm font-medium text-blue-900 underline-offset-2 hover:underline">
              {`${firstName} ${lastName}`}
            </span>
          </Link>
        </div>
        <Link to={`/gig/${_id}`}>
          <h5 className="text-base font-semibold tracking-tight text-gray-900/60 hover:underline dark:text-white">
            {title}
          </h5>
        </Link>

        <div>
          <p className="text-lg mb-0.5">
            <span>From: </span>
            <span className="text-2xl font-medium text-gray-900 dark:text-white">
              ${services?.price || 0}
            </span>
          </p>
          <StarRating
            star={rating?.starNumber}
            ratingCount={rating?.totalStars}
            size={"w-4 h-4"}
          />
        </div>
      </div>
    </div>
  );
};

export default GigCard;
