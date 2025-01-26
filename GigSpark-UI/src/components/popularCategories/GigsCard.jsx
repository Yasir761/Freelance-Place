import React from "react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

const GigsCard = React.memo(({ card, index, hovered, setHovered }) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      "relative w-full aspect-[11/15] overflow-hidden rounded-lg bg-gray-100 dark:bg-neutral-900 transition-all duration-300 ease-out snap-start cursor-pointer",
      hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
    )}
  >
    {/* Card Background Image */}
    <img
      src={card?.coverPicture?.url}
      alt={card?.name || "Category Cover"}
      className="object-cover w-full h-full"
    />

    {/* Card Name (visible when not hovered) */}
    {hovered !== index && (
      <p className="absolute bottom-0 left-0 w-full p-3 text-base font-medium text-gray-200 bg-gradient-to-t from-gray-900 to-transparent">
        {card?.name}
      </p>
    )}

    {/* Hover Content */}
    <Link
      to={`/gigs/${card?.name.split(" ").join("-").toLowerCase()}?source=${
        card._id
      }`}
    >
      <div
        className={cn(
          "absolute inset-0 flex items-end bg-black/50 px-4 py-8 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="absolute top-3 left-4 z-10">
          {/* Card Description */}
          <p className="text-sm text-gray-300">{card?.description}</p>
          {/* Card Name */}
          <h1 className="mt-2 text-xl font-semibold text-white md:text-2xl">
            {card?.name}
          </h1>
        </div>
      </div>
    </Link>
  </div>
));

GigsCard.displayName = "GigsCard";
export default GigsCard;
