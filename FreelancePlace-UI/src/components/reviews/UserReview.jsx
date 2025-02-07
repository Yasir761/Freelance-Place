import React from "react";
import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";
import {} from "react-icons/ai";
import StarSvg from "../ui/StarSvg";

const UserReview = ({ user }) => {
  const { name, profile, location, rating } = user;

  return (
    <div className="border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center space-x-3 border-b pb-4">
        <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-orange-500 text-white text-lg font-semibold">
          <img src={profile} alt={name} className="object-cover h-full" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-start space-x-2">
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(null)
              .map((_, index) => {
                const isLast = rating?.star === index + 1;
                return (
                  <StarSvg
                    key={index}
                    rating={rating?.star}
                    isFill={rating?.star >= index + 1}
                    size={"h-3 w-3"}
                  />
                );
              })}
              <span className="font-semibold ml-2 text-sm">({Math.round(rating?.star)} star)</span>
          </div>
          <p className="text-gray-500 text-sm">• 1 day ago</p>
        </div>

        <p className="mt-3 text-gray-800">
          He did an amazing job and was very patient with me. I will recommend
          him to anyone who needs a developer. One of the best I have ever
          worked with, and I look forward to working with him again. Thanks for
          enhancing my project and doing an amazing job.
        </p>

        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-700 font-medium">₹17,200–₹34,400</p>
          <p className="text-gray-500">4 weeks</p>
        </div>

        <div className="flex items-center space-x-4 mt-3">
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <AiTwotoneLike />
            <span className="ml-1">Yes</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <AiTwotoneDislike />
            <span className="ml-1">No</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserReview;
