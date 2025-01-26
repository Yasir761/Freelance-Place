import React from "react";
import { cn } from "../../lib/utils";

const Image = ({ src, alt, className, objectFit, layout = "", height, width }) => {
  return (
    <img src={src} alt={alt} className={cn(className, `object-${objectFit}`)} height={height} width={width} />
  );
};

export default Image;
