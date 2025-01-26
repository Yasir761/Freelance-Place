import React, { useEffect } from "react";
import "../../styles/CubesAnimation.css"; // Import custom CSS for keyframe animations

const PageLoader = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="absolute inset-0 w-screen h-screen bg-blue-50 z-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1 items-center">
        <div className="loader px-8">
        </div>
        <div className="dot rounded-full aspect-square w-1 text-gray-950 -mb-4 align-bottom"></div>
        </div>
    </div>
  );
};

export default PageLoader;
