import React from "react";
import { Carousel, CarouselNext, CarouselPrevious } from "../ui/Carousel.jsx";

import { Slide } from "./Slide";

const CategoryCarousel = ({ data, Item, cardLimit, className }) => {
  return (
      <Carousel className={`w-full bg-inherit ${className}`}>
        <Slide Item={Item} data={data} cardLimit={cardLimit}/>
        <CarouselPrevious className="bg-inherit backdrop-blur-md" />
        <CarouselNext className="bg-inherit backdrop-blur-md" />
      </Carousel>
  );
};

export default CategoryCarousel;
