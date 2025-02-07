import React from "react";
import Video from "../../components/video/Video.jsx";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { AiOutlineTransaction } from "react-icons/ai";
import { RiAedFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { showAuthenticatePage } from "../../slices/showLoginForm.slice.js";
import UserTestimonials from "../../components/becomeA_seller/UserTestimonials.jsx";
import FreelanceCommunity from "../../components/becomeA_seller/FreelanceCommunity.jsx";
import WorkStep from "../../components/becomeA_seller/WorkStep.jsx";
import CallToAction from "../../components/becomeA_seller/CallToAction.jsx";
import Qna from "../../components/becomeA_seller/Qna.jsx";

const BecomeA_Selller = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(showAuthenticatePage("signin"));
  };

  return (
    <section className="bg-inherit">
      <div className="bg-black w-full h-screen fixed top-0 left-0 z-[-1]">
        <Video
          src={"./video/GigSpark-Become-seller.mp4"}
          className="h-full w-full object-cover"
          controls={false}
        />
      </div>

      <div className="font-secondary relative z-[1] bg-gradient-to-b from-transparent to-gray-800 min-h-[calc(100dvh-110px)] text-white w-full">
        <div className="text-center flex items-center justify-center sm:absolute top-0 left-0 min-h-[calc(100dvh-110px)] w-full">
          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-4xl sm:text-5xl font-bold">Work Your Way</h1>
            <p className="text-lg sm:text-2xl">
              You bring the skill. We'll make earning easy.
            </p>
            <button
              href="#_"
              className="relative inline-block mt-6 px-4 py-2 font-medium group active:scale-95"
              onClick={handleLogin}
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-md"></span>
              <span className="absolute inset-0 w-full h-full  transition duration-300 ease-out  bg-white border-2 border-black group-hover:bg-black  rounded-md"></span>
              <span className="relative text-black group-hover:text-white">
                Become a seller
              </span>
              <div className="absolute inset-x-0 h-0.5 w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            </button>
          </div>
        </div>

        <div className="sm:absolute bg-white text-black sm:text-gray-50 sm:bg-gray-50/20  sm:top-auto sm:bottom-0 left-0 w-full py-12 sm:py-6">
          <div className="flex items-center justify-center gap-12 max-sm:flex-col *:max-sm:gap-8">
            <div className="flex-1 px-6 flex items-center justify-center gap-2">
              <BiSolidPurchaseTag className="text-5xl" />
              <div>
                <p className="text-base md:text-xl xl:text-2xl text-center">
                  A Gig is Bought Every
                </p>
                <p className="text-2xl md:text-3xl xl:text-5xl">4 SEC</p>
              </div>
            </div>
            <div className="flex-1 px-6 flex items-center justify-center gap-2">
              <AiOutlineTransaction className="text-5xl" />
              <div>
                <p className="text-base md:text-xl xl:text-2xl text-center">
                  Transactions
                </p>
                <p className="text-2xl md:text-3xl xl:text-5xl">50M+</p>
              </div>
            </div>
            <div className="flex-1 px-6 flex  items-center justify-center gap-2">
              <RiAedFill className="text-5xl" />
              <div>
                <p className="text-base md:text-xl xl:text-2xl text-center">
                  Price Range
                </p>
                <p className="text-2xl md:text-3xl xl:text-5xl">$1 - $10,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-950 text-white">
        <div className="max-w-screen-xl mx-auto p-4 sm:p-6 font-secondary flex flex-col gap-16 relative z-[1]">
          <FreelanceCommunity />
          <WorkStep />
          <UserTestimonials />
          <Qna/>
          <CallToAction/>
        </div>
      </div>
    </section>
  );
};

export default BecomeA_Selller;
