
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = React.memo(({ className }) => {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
    "M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731",
    "M-156 -445C-156 -445 -88 -40 376 87C840 214 908 619 908 619",
    "M-44 -573C-44 -573 24 -168 488 -41C952 86 1020 491 1020 491",
  ];

  const motionVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: [0, 0.7, 0.5], 
      pathLength: [0, 1], 
      transition: { 
        duration: 4, 
        ease: "easeInOut", 
        repeat: Infinity, 
        repeatType: "mirror" 
      },
    },
  };

  return (
    <div
      className={cn(
        "absolute h-full w-full inset-0 flex items-center justify-center pointer-events-none",
        className
      )}
    >
      <svg
        className="z-0 h-full w-full absolute"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, index) => (
          <motion.path
            key={index}
            d={path}
            strokeWidth={0.7 + index * 0.2} // Slight variation in thickness
            stroke={`url(#gradient${index})`} // Unique gradients for each path
            strokeLinecap="round"
            variants={motionVariants}
            initial="initial"
            animate="animate"
          />
        ))}

        {/* Gradient Definitions */ }
        <defs>
          {paths.map((_, index) => (
            <linearGradient
              key={`gradient${index}`}
              id={`gradient${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={`hsl(${200 + index * 20}, 80%, 90%)`} /> {/* Lighter start */}
              <stop offset="100%" stopColor={`hsl(${240 + index * 20}, 80%, 70%)`} /> {/* Lighter end */}
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
});
