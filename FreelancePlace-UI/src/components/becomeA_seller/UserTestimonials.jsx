import React from "react";
import { AnimatedTestimonials } from "../ui/animated-testimonials.jsx";

const UserTestimonials = () => {
  return (
    <div className="px-2 py-24 pb-16 bg-slate-300 rounded-2xl relative">
  
      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-x-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 py-5">
            Inspiring Buyer Stories
          </h2>
          <p className="text-base lg:text-lg font-normal text-gray-500 max-w-md md:max-w-2xl mx-auto">
            See how real buyers achieved success with our talented freelancers.
            Discover their journeys and get inspired to start your own project.
          </p>
        </div>

        <AnimatedTestimonials autoplay={true} testimonials={userTestimonials} />
      </div>
    </div>
  );
};

export default UserTestimonials;

const userTestimonials = [
  {
    name: "Sophia Carter",
    quote:
      "GigSpark transformed my business by connecting me with talented professionals. Highly recommended!",
    src: "/img/testimonialsUser/1.jpg",
    designation: "Small Business Owner",
  },
  {
    name: "James Rodriguez",
    quote:
      "The platform is user-friendly, and the freelancers are top-notch. I've completed several projects successfully.",
    src: "/img/testimonialsUser/2.jpg",
  },
  {
    name: "Ava Johnson",
    quote:
      "I love how easy it is to find quality talent on GigSpark. It's a game-changer for startups.",
    src: "/img/testimonialsUser/5.jpg",
    designation: "Startup Founder",
  },
  {
    name: "Liam Anderson",
    quote:
      "As a freelancer, GigSpark has helped me find amazing clients and grow my career.",
    src: "/img/testimonialsUser/3.jpg",
  },
  {
    name: "Mia Thomas",
    quote:
      "Thanks to GigSpark, I completed my dream project within budget and on time.",
    src: "/img/testimonialsUser/4.jpg",
    designation: "Project Manager",
  },
  {
    name: "Ethan White",
    quote:
      "A fantastic platform for both freelancers and businesses to collaborate seamlessly.",
    src: "/img/testimonialsUser/6.jpg",
  },
  {
    name: "Olivia Martin",
    quote:
      "GigSpark is my go-to platform for hiring skilled freelancers. The experience has been phenomenal.",
    src: "/img/testimonialsUser/7.jpg",
    designation: "Marketing Consultant",
  },
  {
    name: "Noah Davis",
    quote:
      "The ease of use and the quality of freelancers make GigSpark stand out from the rest.",
    src: "/img/testimonialsUser/8.jpg",
  },
];
