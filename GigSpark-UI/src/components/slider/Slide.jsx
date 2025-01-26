"use client";
import React, { useState } from "react";
import { CarouselContent, CarouselItem } from "../ui/Carousel";

export function Slide({Item, data, cardLimit}) {
  const [hovered, setHovered] = useState(null);

  return (
    <CarouselContent className={"mx-6"}>
        {data.map((card, index) => (
          <CarouselItem key={card._id} className={cardLimit}>
            {/* card */}
            <Item
              card={card}
              index={index}
              hovered={hovered}
              setHovered={setHovered}
            />
          </CarouselItem>
        ))}
    </CarouselContent>
  );
}
