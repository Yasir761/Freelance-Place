import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const LikeButton = ({ className = "" }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteGig = (e) => {
    e.preventDefault();
    setIsFavorite((old) => !old);
  };

  return (
    <button
      onClick={handleFavoriteGig}
      className={`text-white backdrop-blur-3xl focus:ring-4 focus:ring-blue-300 rounded-full px-2.5 py-2.5 text-center  ${className}`}
    >
      {isFavorite ? (
        <FaHeart className="text-xl" />
      ) : (
        <FaRegHeart className="text-xl" />
      )}
    </button>
  );
};

export default LikeButton;
