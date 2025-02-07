import React from "react";
import { Meteors } from "../ui/meteors.jsx";

const FreelanceCommunity = () => {
  return (
    <div className="py-20 pb-16 px-3 relative">
     

      <div className="mx-auto grid grid-cols-1 gap-x-6">
        <div className="mb-20 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold  py-5">
            Be Part of Something Bigger
          </h2>

          <p className="text-base lg:text-lg font-normal text-gray-500 max-w-md md:max-w-2xl mx-auto">
            Join thousands of talented freelancers and clients working together
            to create amazing projects. Grow, collaborate, and succeed with us.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-10">
          {users.map((card) => (
            <UserCard key={card?.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreelanceCommunity;

const UserCard = ({ card }) => {
  return (
    <div className="mx-auto w-full h-full relative max-w-80">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] -translate-y-16 bg-red-500 rounded-full blur-3xl opacity-60" />

      <div className="rounded-lg overflow-hidden transition-all duration-300 shadow-md hover:shadow-2xl group relative border border-gray-500 bg-neutral-950">
        <div className="relative">
          <div className="w-full h-60 clipy">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300 clippy"
              src={card?.profileUrl}
              alt={card?.name}
            />
          </div>
          <div className="clippy absolute bottom-0 left-0 top-0 right-0 bg-blue-700/40 group-hover:bg-transparent transition-all p-4 text-white flex flex-col justify-end items-center"></div>
        </div>
        <div className="pt-3 pb-5 px-5 flex flex-col items-center ">
          <p className="font-bold text-2xl">{card?.name}</p>
          <p className="mb-2 text-gray-600 text-sm">{card?.designation}</p>
          <p className="text-center text-base text-gray-400 mb-2">
            {card?.bio}
          </p>
        </div>

        <Meteors number={20} />
      </div>
    </div>
  );
};

const users = [
  {
    id: 1,
    name: "John Doe",
    designation: "Product Designer",
    bio: "Apparently we had reached a great height in the atmosphere.",
    profileUrl:
      "https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: 2,
    name: "Sophia Smith",
    designation: "Software Engineer",
    bio: "Building innovative solutions that make a difference in the tech world.",
    profileUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: 3,
    name: "Liam Brown",
    designation: "UI/UX Designer",
    bio: "Designing interfaces that create seamless user experiences.",
    profileUrl:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: 4,
    name: "Olivia Johnson",
    designation: "Content Strategist",
    bio: "Crafting stories that resonate with audiences worldwide.",
    profileUrl:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: 5,
    name: "Ethan Davis",
    designation: "Data Scientist",
    bio: "Transforming raw data into actionable insights for better decisions.",
    profileUrl:
      "https://images.pexels.com/photos/2379003/pexels-photo-2379003.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: 6,
    name: "Emma Wilson",
    designation: "Marketing Specialist",
    bio: "Driving brand growth through innovative marketing strategies.",
    profileUrl:
      "https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
];
