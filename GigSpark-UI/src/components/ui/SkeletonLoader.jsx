import React from "react";
import { cn } from "../../lib/utils";

const SkeletonLoader = ( props) => {
  return (
    <div
      className={cn(
        `relative bg-gray-400/10 before:z-[-1] before:absolute before:inset-0
    before:-translate-x-full
    before:animate-[shimmer_2s_infinite]
    before:bg-gradient-to-r
    before:from-transparent before:via-gray-200/10 before:to-transparent isolate
    overflow-hidden
    shadow-xl shadow-black/5
    before:border-t before:border-gray-200/10`,
        props?.className
      )}
    >
      {props.children}
    </div>
  );
};

export default SkeletonLoader;
