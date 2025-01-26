import React from "react";

const WorkStep = () => {
  return (
    <section
      id="works"
      className="relative bg-gray-900 pt-24 py-10 sm:py-16 lg:py-24 px-4 rounded-xl shadow-lg"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    

        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl text-white font-extrabold mx-auto md:text-4xl lg:text-5xl">
            Simple Steps to Success{" "}
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-base text-gray-400 leading-relaxed md:text-xl">
            Explore how our platform connects you with top freelancers in just a
            few clicks. Your project, your way, made effortless.
          </p>
        </div>
        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
            <img
              width="1000"
              height="500"
              decoding="async"
              data-nimg="1"
              className="w-full"
              style={{ color: "transparent" }}
              src="/img/curved-dotted-line.svg"
            />
          </div>
          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            {workStepList.map((step, index) => {
              return (
                <div>
                  <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                    <span className="text-xl font-semibold text-gray-700">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl  text-white font-semibold leading-tight md:mt-10">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base text-gray-400 md:text-lg">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkStep;

const workStepList = [
  {
    title: "Create Your Gig",
    description:
      "Sign up, set up your gig, and showcase your skills to a global audience with an engaging title, images, and pricing.",
  },
  {
    title: "Deliver Quality Work",
    description:
      "Stay notified, communicate clearly, and deliver exceptional work to build trust and gain repeat clients.",
  },
  {
    title: "Get Paid Securely",
    description:
      "Enjoy on-time, secure payments with no delays, so you can focus on your work stress-free.",
  },
];
