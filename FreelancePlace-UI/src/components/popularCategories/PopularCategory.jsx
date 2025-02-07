import React from "react";
import { useSelector } from "react-redux";
import CategoryCarousel from "../slider/Slider.jsx";
import CategoryCardShimmerUI from "../ui/shimmerUI/CategoryCard.jsx";
import GigsCard from "./GigsCard.jsx";

const PopularCategory = () => {
  const AllCategories = useSelector((store) => store?.category);

  return (
    <section className="w-full p-4 sm:p-6">
      <div className="max-w-screen-xl mx-auto">
        <section className="">
          <div className="bg-inherit">
            <div className="mb-20 text-center">
              <div className="inline-block py-1 px-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide">
                Popular Categories
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent py-6 bg-gradient-to-b from-white to-zinc-950 from-20% bg-clip-text">
                Explore Our Most Loved Categories
              </h2>
              <p className="text-base lg:text-lg font-medium text-gray-400 max-w-lg md:max-w-3xl mx-auto">
                Dive into a curated selection of categories that our users
                adore. From creative design to technical development, find your
                perfect match for every project need.
              </p>
            </div>

            <div className="p-4">
              {AllCategories.length <= 0 ? (
                <CategoryCarousel
                  Item={CategoryCardShimmerUI}
                  data={Array(8).fill(0)}
                  cardLimit={
                    "sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  }
                  className={"md:px-8 px-6 max-w-screen-xl"}
                />
              ) : (
                <CategoryCarousel
                  Item={GigsCard}
                  data={AllCategories}
                  cardLimit={
                    "sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  }
                  className={"md:px-8 px-2 max-w-screen-xl"}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default PopularCategory;
