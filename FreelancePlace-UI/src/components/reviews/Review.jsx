import React, { useState } from "react";
import StarRating from "../ui/StarRating";
import UserReview from "./UserReview";
import { IoSearch } from "react-icons/io5";
import StarSvg from "../ui/StarSvg";
import ReviewFilter from "./ReviewFilter";
import { dummyUserInfo } from "../../mocks/data";

// totalReview = review.lenght - 1 >>  362;
// FILTER -: fiveStar: 24, fourStar: 35, threeStar: 58, twoStar: 244, oneStar: 1,
// AVERAGE = 5∗fiveStar + 4∗fourStar + 3∗threeStar + 2∗twoStar + 1∗oneStar / (totalReview)

const Review = ({ rating }) => {
  const { starNumber, totalStar } = rating;
  const [reviewSearch, serReveiwSearch] = useState("")
  const user = dummyUserInfo; // for testing..

  return (
    <div>
      <div className="max-w-3xl mx-auto py-6">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
        <div className="mb-6">
          <div className="flex justify-between items-center gap-3">
            <p className="text-gray-700 font-semibold">
              {totalStar} reviews for this Gig
            </p>
            <div className="flex items-center justify-end gap-1 text-yellow-500">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {Array(5)
                  .fill(null)
                  .map((_, index) => {
                    const isLast = Math.round(starNumber) === index + 1;
                    return (
                      <StarSvg
                        key={index}
                        rating={starNumber}
                        isFill={Math.round(starNumber) >= index + 1}
                        isLast={isLast}
                        size={"w-4 h-4"}
                      />
                    );
                  })}
              </div>
              <p className="text-sm font-bold text-gray-800">
                {Number(totalStar).toFixed(1)}
              </p>
            </div>
          </div>
          <ReviewFilter />
        </div>

        <div className="relative max-w-72">
          <input
            type="text"
            value={reviewSearch}
            onChange={(e) => serReveiwSearch(e.target.value)}
            placeholder="Search reviews"
            className="w-full border border-gray-300 rounded-sm p-2 pl-4 focus:outline-none focus:ring-1 focus:ring-black"
          />
          <button className="absolute right-0 rounded-r-sm top-1/2 h-full w-12 transform -translate-y-1/2 text-gray-100 bg-gray-950 flex items-center justify-center">
            <IoSearch className="text-xl" />
          </button>
        </div>
      </div>
      <div>
        <UserReview user={user}/>
      </div>
    </div>
  );
};

export default Review;
