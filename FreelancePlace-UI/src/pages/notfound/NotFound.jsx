import React from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden min-h-screen bg-gray-100">
      <Navbar />
      <div className="min-h-screen absolute top-0 left-0 w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full px-6 text-center relative z-10">
          <main className="flex flex-col items-center mt-16  max-w-[500px]">
            <div className="relative">
              <img
                src="/img/404-man.png"
                alt="404 Illustration"
                className="w-full animate-in"
              />
              <p className="sm:mt-8 max-sm:mb-4 text-lg max-sm:font-medium max-w-[70%] max-sm:mx-auto block     text-gray-800 sm:absolute sm:bottom-2 sm:left-2 sm:text-left sm:max-w-[50%]">
                We apologize, but the page you're looking for is not in our
                records.
              </p>
            </div>
            <div className="mt-6 w-full flex items-center justify-between gap-4 px-4 max-sm:flex-wrap max-sm:*:w-full">
              <Link
                to="/"
                className="cursor-pointer text-white py-3 px-8 font-bold bg-gray-800 rounded-full shadow-md hover:bg-gray-900 border-2 border-gray-950 "
              >
                Back to Home{" "}
                <FaHome className="inline-block align-text-top ml-1 text-xl" />
              </Link>
              <button
                onClick={() => navigate(-1)}
                className="cursor-pointer text-gray-950 py-3 px-8 font-bold bg-gray-50 border-2 border-gray-950 rounded-full shadow-md hover:bg-gray-100"
              >
                Previous Page
              </button>
            </div>
          </main>
        </div>

        <img
          src="/img/404-wave-left.svg"
          alt="left"
          className="absolute -left-20 -bottom-16 w-[70vw]"
        />
        <img
          src="/img/404-wave-right.svg"
          alt="right"
          className="absolute -right-20 bottom-0 w-[70vw]"
        />
      </div>
    </section>
  );
};

export default NotFound;
