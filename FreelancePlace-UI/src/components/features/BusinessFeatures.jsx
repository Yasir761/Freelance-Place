import React from "react";
import { FaUsers, FaHandshake, FaRocket } from "react-icons/fa";
import { showAuthenticatePage } from "../../slices/showLoginForm.slice.js";
import { useDispatch } from "react-redux";

const BusinessFeatures = () => {
  const FeatureIcon = [FaUsers, FaHandshake, FaRocket];
  const dispatch = useDispatch();

  const handleSignUp = () => {
    dispatch(showAuthenticatePage("/signup"));
  };

  return (
    <section className="overflow-hidden  py-8 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-blue-400">
                Freelance Place <i className="font-normal">business</i>
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
                A business solution design for <i>teams</i>
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-500">
                Upgrade to a curated experience package with tools and benifits
                dedicated to businesses.
              </p>
              <ul className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {items.map((item, index) => {
                  const Icon = FeatureIcon[index];
                  return (
                    <li
                      className="flex items-stretch justify-start gap-2"
                      key={index}
                    >
                      <Icon className="h-10 w-10 text-blue-500" />
                      <div>
                        <span className="font-semibold text-gray-100 ">
                          {item.title}&nbsp;
                        </span>
                        <span className="inline text-gray-400">
                          {item.description}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <button
              onClick={handleSignUp}
              className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 mt-10"
            >
              Start for free
            </button>
          </div>
          <div className="rounded-xl shadow-xl ring-1 ring-gray-400/10 md:-ml-4 lg:-ml-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxjb21wdXRlcnxlbnwwfDB8fHwxNjkxODE2NjY3fDA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Product screenshot"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessFeatures;

const items = [
  {
    title: "Connect to freelancers",
    description:
      "With proven business experience, find the right experts for your needs.",
    icon: <FaUsers className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />,
  },
  {
    title: "Perfect talent matches",
    description:
      "Get matched with the ideal talent by a dedicated customer success manager.",
    icon: (
      <FaHandshake className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
    ),
  },
  {
    title: "Boost productivity",
    description:
      "Manage teamwork effectively with a powerful workspace tailored for you.",
    icon: <FaRocket />,
  },
];