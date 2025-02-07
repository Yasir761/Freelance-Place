import React from "react";
import { useSelector } from "react-redux";
import { FaCircleCheck } from "react-icons/fa6";
import NewGigMultistepForm from "./NewGigMultistepForm";

const RenderSteps = () => {
  const currentStep = useSelector((store) => store.currentFormStep);

  const formSteps = [
    { id: 1, title: "Gig Information" },
    { id: 2, title: "Course Services" },
    { id: 3, title: "Publish" },
  ];

  return (
    <div className="w-full">
      <div className="w-full flex p-6 px-10">
        {formSteps.map((step) => (
          <div
            className="flex flex-col items-center gap-2 relative flex-1"
            key={step.id}
          >
            <div className="h-10 w-10 bg-white relative z-10">
              {currentStep > step.id ? (
                <FaCircleCheck className="text-green-600 text-xl w-10 h-10" />
              ) : (
                <div className="font-medium *:text-xl *:flex *:items-center *:justify-center *:h-10 *:w-10 *:rounded-full *:relative *:z-[3]">
                  {step.id === currentStep ? (
                    <span className="text-yellow-500  border-[3px] border-yellow-500 bg-yellow-400/30 ">
                      {step.id}
                    </span>
                  ) : (
                    <span className=" text-gray-300 bg-gray-700/40 ">
                      {step.id}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="">
              {step.id !== 3 && (
                <hr
                  className={`${
                    step.id <= currentStep - 1
                      ? "border-green-400"
                      : " border-gray-400 "
                  } border-[1px] border-dotted w-full absolute top-5 z-[0]`}
                />
              )}
            </div>
            <span
              className={`${currentStep > step.id && "text-green-600"} ${
                currentStep === step.id ? "text-yellow-500" : "text-gray-400"
              } font-medium`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
      <NewGigMultistepForm />
    </div>
  );
};

export default RenderSteps;
