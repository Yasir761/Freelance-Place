import React, { useState } from "react";
import Image from "../ui/Image";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto mb-16">
      <div className="relative overflow-hidden rounded-2xl transition duration-200 group bg-white hover:shadow-2xl border border-zinc-300 ">
        <div className="w-full bg-gray-300 rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative z-[1]">
          <Image
            src={card.images[0]}
            alt="thumbnail"
            layout="fill"
            objectFit="cover"
            className={`group-hover:scale-95 group-hover:shadow-gray-400/50 group-hover:shadow-xl group-hover:rounded-2xl transform object-cover transition duration-200 `}
          />
          <span
            className={`absolute inset-0 z-[-1] bg-cover bg-no-repeat bg-center bg-blue-100 blur-sm`}
          />
        </div>
        <div className="flex gap-2 flex-col flex-wrap p-4 relative bg-inherit group overflow-hidden">
          <div className={"flex gap-4 items-center"}>
            <img
              src={card.user?.userProfile}
              alt="user"
              className="h-8 w-8 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-base text-gray-900">
                {card.category.name}
              </h2>
              <h3 className="text-xs text-teal-900">{card.user?.username}</h3>
            </div>
          </div>
          <div className="w-full h-full absolute left-0 p-4 bg-inherit transition-all duration-200 top-full group-hover:top-0">
            <Button
              onClick={() => {
                navigate(`/gig/${card.id}`)
              }}
              disabled={false}
              children={"View"}
              className={
                "w-full relative px-6 py-2 bg-teal-950 hover:bg-teal-950/90 text-white font-medium rounded-xl text-xs"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
