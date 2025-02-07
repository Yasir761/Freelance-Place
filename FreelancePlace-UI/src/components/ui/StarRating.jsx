import React from "react";
import StarSvg from "./StarSvg";
import { IoPeople } from "react-icons/io5";

const StarRating = ({
  star,
  ratingCount,
  size,
  className = { rating: "", ratingCount: "" },
}) => {
  return (
    <div className="flex items-center mb-2">
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        {Array(5)
          .fill(null)
          .map((_, index) => {
            const isLast = Math.round(star) === index + 1;
            return ( 
              <StarSvg
                key={index}
                rating={star}
                isFill={Math.round(star) >= index + 1}
                isLast={ isLast }
                size={size}
              />
            );
          })}
      </div>
      <span
        className={`bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3 ${className?.rating}`}
      >
        {Number(star).toFixed(1)}
      </span>

      <span
        className={`bg-blue-100 text-blue-800 font-semibold text-xs px-2.5 py-0.5 rounded inline-flex items-center gap-2 dark:bg-blue-200 dark:text-blue-800 ms-1.5 ${className?.ratingCount}`}
      >
        <IoPeople />
        {ratingCount}
      </span>
    </div>
  );
};

export default StarRating;
