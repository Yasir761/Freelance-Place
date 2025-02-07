import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { BsPatchCheckFill } from "react-icons/bs";

export const StickyScroll = ({ content, contentClassName, heading, height }) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref,
    container: ref,
    offset: ["start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)",
    "var(--gray-900)",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
    "linear-gradient(to bottom right, var(--blue-500), var(--yellow-500))",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div>
      <div className="text-center my-8 w-full">
        {heading && (
          <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl font-primary">
            {heading}
          </h1>
        )}
      </div>
      <motion.div
        animate={{
          backgroundColor:
            backgroundColors[activeCard % backgroundColors.length],
        }}
        className={`scrollbar-hidden overflow-y-auto flex justify-center lg:justify-between relative space-x-10 lg:p-20 p-6 rounded-2xl w-full ${height}`}
        ref={ref}
      >
        <div className="div relative flex items-start px-4">
          <div className="">
          <div className="h-10 lg:block hidden" />
            {content.map((item, index) => (
              <div key={item.title + index} className="my-20">
                <motion.h2
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="text-4xl font-bold text-slate-100 flex items-center gap-1"
                >
                  <BsPatchCheckFill className="inline-block mr-2 text-blue-600 text-4xl align-middle" />{" "}
                  <span>{item.title}</span>
                </motion.h2>
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="text-kg text-slate-300 max-w-sm mt-10"
                >
                  {item.description}
                </motion.p>
              </div>
            ))}
            {/* One for increse the scroll height till the last */}
            <div className="my-20 opacity-0">
                <h2
                  className="text-4xl font-bold text-slate-100 flex items-center gap-1"
                >
                  <span>{content[content.length - 1].title}</span>
                </h2>
                <p
                  className="text-kg text-slate-300 max-w-sm mt-10"
                >
                  {content[content.length - 1].description}
                </p>
              </div>
          </div>
        </div>
        <div
          style={{ background: backgroundGradient }}
          className={cn(
            "hidden lg:block basis-1/2  rounded-md bg-white sticky top-10 overflow-hidden",
            contentClassName
          )}
        >
          {content[activeCard].content ?? null}
        </div>
      </motion.div>
    </motion.div>
  );
};
