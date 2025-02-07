import React from "react";
import { servicesData } from "../../mocks/categoryData.js";
import CategoryCardShimmerUI from "../ui/shimmerUI/CategoryCard.jsx";
import Slider from "../slider/Slider.jsx";
import {
  FaPaintBrush,
  FaBullhorn,
  FaKeyboard,
  FaVideo,
  FaMusic,
  FaCode,
  FaBriefcase,
  FaSpa,
  FaDatabase,
  FaCamera,
} from "react-icons/fa";
import { Meteors } from "../ui/meteors.jsx";

const CardIcon = [
  FaPaintBrush,
  FaBullhorn,
  FaKeyboard,
  FaVideo,
  FaMusic,
  FaCode,
  FaBriefcase,
  FaSpa,
  FaDatabase,
  FaCamera,
];

// Utility function to generate random hex color
const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const ExploreCategory = () => {
  return (
    <section className="w-full p-4 sm:p-6" id="explore-categories">
      <div className="max-w-screen-xl mx-auto mb-10 px-4 sm:px-6 relative">
        <div className="space-y-24 py-12">
          {/* Header Section */}
          <div className="max-w-xl mx-auto text-center xl:max-w-2xl">
        
            <h2 className="text-3xl font-bold leading-tight bg-gradient-to-b from-white to-zinc-950 from-50% bg-clip-text text-transparent sm:text-4xl xl:text-5xl mb-6">
              Our Professional Services
            </h2>
            <p className="mb-4 text-zinc-400">
              Explore a wide range of services crafted to help you achieve your
              goals efficiently and effectively. From creative designs to
              technical solutions, we've got you covered.
            </p>
          </div>

          {/* Slider Section */}
          <div>
            {servicesData.length <= 0 ? (
              <Slider
                Item={CategoryCardShimmerUI}
                data={Array(6).fill(0)}
                cardLimit="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                className="md:px-8 px-6 max-w-screen-xl"
              />
            ) : (
              <Slider
                Item={ServiceCard}
                data={servicesData}
                cardLimit=""
                className="md:px-8 max-w-screen-xl px-2"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ card: service, index }) => {
  const Icon = CardIcon[index];
  const color = getRandomColor();

  return (
    <div className="sm:p-4 w-full">
      <div className="bg-gray-950 text-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow relative overflow-hidden shadow-zinc-700/40 w-full sm:aspect-[3/2] text-center flex flex-col items-center justify-center">
        <div className="flex text-4xl justify-center" style={{ color }}>
          <Icon />
        </div>
        <h3 className="mb-2 mt-4 text-2xl font-bold sm:mt-4">{service.title}</h3>
        <p className="text-sm text-gray-400">{service.description}</p>
        <Meteors />
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] -translate-y-16 bg-red-500 rounded-full blur-3xl opacity-60" />
      </div>
    </div>
  );
};

export default ExploreCategory;
