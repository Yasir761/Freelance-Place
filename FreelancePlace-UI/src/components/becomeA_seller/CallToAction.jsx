import React from "react";
import GetStartedBtn from "./GetStartedBtn.jsx";
import { Meteors } from "../ui/meteors.jsx";

const CallToAction = () => {
  return (
    <div className="relative py-8 p-6 rounded-2xl mb-16 overflow-hidden bg-gray-950 border border-gray-500">
      <div className=" relative z-20 text-white text-center font-primary">
        <h2 className="mb-2 text-2xl sm:text-4xl">
          Sign up and create your first Gig today
        </h2>
        <p className="text-gray-500 mb-4">
          GigSpark Freelance services at your fingertips
        </p>
        <GetStartedBtn />
      </div>
       <div className="absolute bottom-[-60%] left-1/2 -translate-x-1/2 aspect-square h-96 w-96 transform bg-gradient-to-r from-blue-500 to-teal-500 bg-red-500 rounded-full blur-3xl opacity-60 shadow-[0px_0px_500px_50px_#3b82f6]" />
      <Meteors number={30}/>
    </div>
  );
};

export default CallToAction;
