import React, { useState } from "react";
import { useSelector } from "react-redux";
import BrandsIconCarousel from "../brandsIconsCarousel/BrandsIconsCarousel.jsx";
import LampDemo from "../ui/lamp.jsx";
import { BackgroundBeams } from "../ui/aurora-background.jsx";

const Hero = () => {
  const [value, setValue] = useState("");

  //current populat categori will be even index under 10; (starting 5 even index)
  const AllCategories = useSelector((store) => store?.category);

  const handleTagClick = (tagName) => {
    console.log(tagName);
  };

  return (
    <section className="overflow-x-hidden relative w-full h-[calc(100dvh-76px)] text-blue-50 bg-gray-950">
      <BackgroundBeams className="h-[calc(100dvh-86px)]" />

      <LampDemo>
        <div className={`flex flex-col gap-3 sm:gap-4 justify-center w-full`}>
       
          {AllCategories.length > 0 ? (
            <div className="flex gap-3 flex-wrap font-semibold">
              <span className="align-middle">Popular:</span>
              {AllCategories.length &&
                AllCategories.map(
                  (cat, index) =>
                    index % 2 == 0 &&
                    index <= 10 && (
                      <button
                        key={cat?._id}
                        onClick={() => handleTagClick(cat?._id)}
                        className="relative inline-flex h-7 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                      >
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-0.5 text-xs font-secondary text-white backdrop-blur-3xl">
                          {cat?.name}
                        </span>
                      </button>
                    )
                )}
            </div>
          ) : null}
        </div>
      </LampDemo>

      <BrandsIconCarousel />
    </section>
  );
};

export default Hero;