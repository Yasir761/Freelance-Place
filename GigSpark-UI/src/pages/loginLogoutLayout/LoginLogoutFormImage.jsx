import React from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import SkeletonLoader from "../../components/ui/SkeletonLoader";

const LoginLogoutFormImage = () => {
  const features = [
    "Over 700 categories",
    "Quality work done faster",
    "Access to talent and businesses across the globe",
  ];

  return (
    <SkeletonLoader className={"hidden md:block relative min-w-60 basis-1/2"}>
      <div className=" relative h-full w-full">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between flex-col gap-4 p-8">
          <div className="relative w-full overflow-hidden rounded-xl sm:rounded-lg shadow-xl">
            <BsSearch className="absolute right-0 top-0 h-9 w-10 p-2.5 font-bold text-sm aspect-square bg-gray-950 cursor-pointer text-blue-50" />
            <input
              type="search"
              name="category-search"
              className="outline-none border-none bg-gray-50 text-blue-950 text-sm pl-3 py-2 pr-12 w-full placeholder:text-gray-950 placeholder:font-semibold shadow-input"
              disabled
              placeholder={`How to start a freelance career?"`}
            />
          </div>
          <div className="flex flex-col gap-1 grow text-lg font-medium text-slate-900">
            {features.map((feature, index) => (
              <span key={index}>
                <IoMdCheckmarkCircleOutline className="inline-block mr-2 text-emerald-600" />
                <span className="text-base text-emerald-950">{feature}</span>
              </span>
            ))}
          </div>
          <h1 className="font-semibold font-logo text-2xl text-transparent bg-gradient-to-b from-gray-950 from-55% to-gray-50 bg-clip-text">
            @GigSpark
          </h1>
        </div>
        <img
          src="/img/auth.png"
          alt="GigSpark freelande platform"
          className="object-cover h-full"
        />
      </div>
    </SkeletonLoader>
  );
};

export default LoginLogoutFormImage;
