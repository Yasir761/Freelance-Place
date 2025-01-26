import React from "react";
import Video from "../video/Video.jsx";

const EmptyList = ({ desctiption }) => {
  return (
    <div className="flex items-center justify-center min-h-[200px] p-4">
      <div className="flex items-center justify-center flex-col text-center gap-2">
        <Video
          src={"/video/EmptyListAnimation.mp4"}
          className="h-40 aspect-video mix-blend-darken"
          controls={false}
        />
        <h2 className="text-2xl font-bold text-gray-700 font-primary">
          <span className="text-yellow-500 mr-2 inline-block">Oops!</span>
          No Record Found
        </h2>
        <p className="text-sm text-gray-500 max-w-[500px]">{desctiption}</p>
      </div>
    </div>
  );
};
export default EmptyList;
