import React from "react";
import VideoSection from "./VideoSection.jsx";
// icons
import { FiPieChart } from "react-icons/fi";
import { FiThumbsUp } from "react-icons/fi";
import { AiOutlineProduct } from "react-icons/ai";
import { BsBarChart } from "react-icons/bs";
import { SiAwsorganizations } from "react-icons/si";
import { BiSupport } from "react-icons/bi";
import { cn } from "../../lib/utils.js";

const FeatureSection = () => {
  const Icons = [
    FiPieChart,
    FiThumbsUp,
    AiOutlineProduct,
    BsBarChart,
    SiAwsorganizations,
    BiSupport,
  ];

  return (
    <section className="w-full p-4 sm:p-6">
      <div className="max-w-screen-xl mx-auto mb-10 *:min-h-screen rounded-md">
        <section className="pt-12 ">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-inherit">
            <div className="mb-14 text-center">
              {/* <span className="py-1 px-4 bg-gray-100 rounded-full text-xs font-medium text-indigo-600">
                Features
              </span> */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-b from-white to-zinc-950 from-20% bg-clip-text text-transparent py-5">
                Why Choose Freelance Place?
              </h2>
              <p className="text-base lg:text-lg font-normal text-gray-500 max-w-md md:max-w-2xl mx-auto">
                Discover the benefits of working with GigSpark. From
                budget-friendly services to secure payments, we provide a
                seamless experience for both freelancers and clients.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 relative gap-3 gap-y-6 text-gray-950">
              {featuresList.map((feature, index) => {
                const Icon = Icons[index];
                return (
                  <FeatureCardItem key={index} feature={feature} Icon={Icon} />
                );
              })}
            </div>
          </div>
        </section>
      </div>
      <VideoSection />
    </section>
  );
};

const FeatureCardItem = ({ feature, Icon }) => {
  return (
    <div className={`p-1 rounded-md relative bg-gradient-to-b from-zinc-50 to-zinc-950 overflow-hidden`}>
      <span className="absolute inset-[-100000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-50" />

      <div className="h-full w-full flex flex-col items-center text-center py-10 px-8 relative bg-zinc-950 rounded-md">
        <div
          style={{
            backgroundColor: feature.bgColor + "30",
            color: feature.bgColor + "ff",
          }}
          className={cn(
            "flex justify-center items-center w-16 h-16 text-3xl rounded-full mb-4"
          )}
        >
          <Icon />
        </div>
        <h4 className="text-lg font-semibold text-gray-100 mb-2">
          {feature.title}
        </h4>
        <p className="text-sm font-normal text-gray-500">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

const featuresList = [
  {
    bgColor: "#ff0000",
    title: "Result",
    description:
      "Accurate results are our top priority, ensuring you always have reliable information at your fingertips.",
  },
  {
    bgColor: "#03ada0",
    title: "Quality",
    description:
      "We are committed to providing high-quality products and services that exceed your expectations.",
  },
  {
    bgColor: "#0000ff",
    title: "Product",
    description:
      "Experience the difference of our feature-rich product that offers everything you require and more.",
  },
  {
    bgColor: "#ffa430",
    title: "Sales",
    description:
      "Experience the difference of our personalized sales approach, where you are always our top priority.",
  },
  {
    bgColor: "#945678",
    title: "Onboarding",
    description:
      "Our onboarding process is designed to be simple and intuitive, so you can start using our platform right away.",
  },
  {
    bgColor: "#ff045d",
    title: "Support",
    description:
      "Our commitment to exceptional support ensures that you receive the assistance you need, whenever you need it.",
  },
];

export default FeatureSection;
