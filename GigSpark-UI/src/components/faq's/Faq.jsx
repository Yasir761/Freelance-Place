import React from "react";
import { FaChevronDown } from "react-icons/fa";

const Faq = ({ faq, setShowAnswer, showAnswer, faqClassName={q : "", a : "" } }) => {
  const { question, answer } = faq;

  return (
    <div className={`border-b last:border-b-transparent border-gray-400 hover:border-l-blue-600 border-l-transparent border-l-4 rounded-md pl-3 transition-all duration-500 `}>
      <h3
        className={`w-full pt-3 pb-3 flex justify-between items-center text-left  font-medium focus:outline-none cursor-pointer ${faqClassName?.q}`}
        type="button"
        onClick={() => setShowAnswer()}
      >
        {question}
        <FaChevronDown
          className={`"h-5 w-5 transform transition-transform duration-300 ${
            showAnswer ? "rotate-180" : "rotate-0"
          }`}
        />
      </h3>

      <div
        className={`transition-all duration-300  ease-in-out overflow-hidden ${
          showAnswer ? "max-h-60" : "max-h-0"
        }`}
        style={{ transition: "max-height 0.3s ease-in-out 0s" }}
      >
        <div className="pb-4 px-2 leading-relaxed">
          <div className={`space-y-2 text-sm leading-relaxed ${faqClassName?.a}`}>{answer}</div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
