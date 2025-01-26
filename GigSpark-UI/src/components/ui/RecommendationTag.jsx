import React from "react";

const RecommendationTag = () => {
  return (
    <span className="z-10 cursor-auto absolute -top-3 -left-3 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-medium hover:text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 text-white dark:text-white focus:outline-none">
      <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-100 bg-opacity-0 uppercase">
        GigSpark's <span className="text-yellow-500">Choice</span>
      </span>
    </span>
  );
};

export default RecommendationTag;
