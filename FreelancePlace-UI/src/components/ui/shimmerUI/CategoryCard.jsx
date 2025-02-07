import React from "react";
import { cn } from "../../../lib/utils";
import { FaImage } from "react-icons/fa6";

const CategoryCardShimmerUI = () => {
  return (
    <div
      className={cn(
        "relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-gray-100 dark:bg-neutral-900 snap-start animate-pulse duration-1000"
      )}
    >
      {/* Icon Placeholder */}
      <div className="flex items-center justify-center w-full h-full bg-gray-300 dark:bg-gray-700 rounded-lg">
        <FaImage className="w-10 h-10 text-gray-400 dark:text-gray-500" aria-hidden="true" />
      </div>

      {/* Shimmer Text Placeholder */}
      <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-b from-gray-700/0 to-gray-900/50 animate-pulse">
        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 mb-2 w-1/2"></div>
        <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 mb-1 w-3/4"></div>
      </div>
    </div>
  );
};

export default CategoryCardShimmerUI;
