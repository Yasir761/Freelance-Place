import React, { useRef, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const GigDetails = ({ details }) => {
  const [showMore, setShowMore] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const { description, keywords, } = details;
  const images = [details?.coverPicture, ...details?.images];

  const handleNextImg = () => {
    if (currentImg === images.length - 1) setCurrentImg(0);
    else setCurrentImg(currentImg + 1);
  };

  const handlePrevImg = () => {
    if (currentImg === 0) setCurrentImg(images.length - 1);
    else setCurrentImg(currentImg - 1);
  };

  return (
    <div>
      <h3 className="font-semibold text-xl md:text-2xl my-3">About this Gig</h3>

      <p dangerouslySetInnerHTML={{ __html: showMore ? description : description + '...'}} className={`${showMore ? "h-auto" : "max-h-24 overflow-hidden"} `}>
      </p>
      {keywords.length > 0 && showMore && (
        <p>
          <span className="font-bold text-base mr-2">Keyword:</span>
          <span> {keywords.join(", ")} </span>
        </p>
      )}
      <button
        className="text-blue-700 font-medium underline"
        onClick={() => setShowMore(!showMore)}
      >
        {!showMore ? "Read More" : "Show Less"}
      </button>

      <div className="relative w-full my-6">
        <div className="relative w-full flex items-center justify-center">
          <img
            className="rounded-t-lg object-cover w-full aspect-video border-4 border-gray-100"
            src={images[currentImg]?.url}
            alt="product image"
          />
          <button
            onClick={handlePrevImg}
            className={`absolute top-1/2 -left-4 -translate-y-1/2 p-2 rounded-full shadow-md border backdrop-blur-md active:scale-95 ${
              images.length <= 1 ? "hidden" : "block"
            }`}
          >
            <IoIosArrowBack className="text-xl" />
          </button>
          <button
            onClick={handleNextImg}
            className={`absolute top-1/2 -right-4 -translate-y-1/2 p-2 rounded-full shadow-md border backdrop-blur-md active:scale-95 ${
              images.length <= 1 ? "hidden" : "block"
            }`}
          >
            <IoIosArrowForward className="text-xl" />
          </button>
        </div>
        <div
          className={`flex gap-3 my-2 ${
            images.length <= 1 ? "hidden" : "block"
          }`}
        >
          {images.map((_, index) => (
            <div
              key={index}
              className="max-w-40 rounded-lg cursor-pointer"
              onClick={() => setCurrentImg(index)}
            >
              <img
                className={`object-cover w-full aspect-video ${
                  index === currentImg ? "opacity-100" : "opacity-25"
                }`}
                src={images[index]?.url}
                alt="product image"
              />
            </div>
          ))}
        </div>
      </div>
      <h3 className="font-bold text-xl md:text-2xl my-6">My Portfolio</h3>

      {/* Show some portfolio's */}
    </div>
  );
};

export default GigDetails;
