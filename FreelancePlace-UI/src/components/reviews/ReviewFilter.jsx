import React from "react";



const ReviewFilter = () => {
  const dummyUserRating = {
    fiveStar: 24,
    fourStar: 35,
    threeStar: 58,
    twoStar: 244,
    oneStar: 1,
  };
  const totalReview = 362;

  return (
    <div className="mt-2 p-4 space-y-4">
      {Object.values(dummyUserRating).map((rate, index) => {
        return (
          <div className="flex items-center mb-2 *:cursor-pointer" key={index}>
            <span className="text-gray-700 text-sm py-1 px-2 rounded-md hover:bg-gray-300 text-nowrap font-medium">
              {5 - index} Stars
            </span>
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mx-2">
              <div
                className="absolute h-full bg-black rounded-full w-[96%]"
                style={{ width: `${(rate / totalReview) * 100}%` }}
              ></div>
            </div>
            <span className="text-gray-600 text-sm font-medium">({rate})</span>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewFilter;
