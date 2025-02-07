import React, { useState } from "react";
import Faq from "./Faq.jsx";

const Faqs = ({
  data,
  heading,
  className = "",
  faqClassName="",
  layoutClass = "flex flex-col gap-4",
}) => {

  const [showAnswer, setShowAnswer] = useState(null);

  if (!data.length) return;

  return (
    <div className={`py-4 ${className}`}>
      {heading && <h2 className="text-xl font-bold mb-4">{heading}</h2>}
      <div className={layoutClass}>
        {data.map((faq) => (
          <Faq
            key={faq?._id}
            faq={faq}
            faqClassName={faqClassName}
            showAnswer={faq?._id === showAnswer ? true : false}
            setShowAnswer={() =>
              setShowAnswer(showAnswer === faq?._id ? null : faq?._id)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Faqs;
