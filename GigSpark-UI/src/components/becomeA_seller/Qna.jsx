import React from "react";
import Faqs from "../faq's/FaqsContainer.jsx";
import { becomeA_Sellerfaqs } from "../../mocks/Faqs.js";

const Qna = () => {
  return (
    <div className="pb-16 py-24 px-4 bg-zinc-900 text-zinc-200 rounded-2xl relative">

   
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-6">
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold py-5">
          Frequently Asked Questions
          </h2>
          <p className="text-base lg:text-lg font-normal text-gray-500 max-w-md md:max-w-2xl mx-auto">
            Find clear and concise answers to the most common questions. Learn
            how to make the most out of your freelance journey.
          </p>
        </div>
        <Faqs data={becomeA_Sellerfaqs} className="" faqClassName={{q : "text-gray-100", a:"text-gray-400"}}/>
      </div>
    </div>
  );
};

export default Qna;
