import React from "react";

const Loading = ({ className }) => {
  return (
    <div
      className={`h-5 w-5 border-2 border-gray-100 border-r-transparent animate-spin inline-block rounded-full ${className}`}
    ></div>
  );
};

export default Loading;
