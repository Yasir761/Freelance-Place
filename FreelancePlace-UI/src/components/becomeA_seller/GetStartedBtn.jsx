import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showAuthenticatePage } from "../../slices/showLoginForm.slice.js";

const GetStartedBtn = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const dispatch = useDispatch()

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePos({ x: clientX, y: clientY });
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
    setMousePos({ x: 0, y: 0 }); // Reset position
  };

  const handleSignIn = () => {
    dispatch(showAuthenticatePage("signup"))
  }

  const transformStyle = hover
    ? `translateX(${(mousePos.x - window.innerWidth / 2) / 5}px) translateY(${
        (mousePos.y - window.innerHeight / 2) / 5
      }px)`
    : "translateX(0px) translateY(0px)";

  return (
    <div
      className="grid min-h-[300px] place-content-center p-4 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <button
        className="group relative grid h-[220px] w-[220px] place-content-center rounded-full border-2 border-white  transition-all duration-700 ease-out"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleSignIn}
        style={{
          transform: transformStyle,
          backgroundColor: hover ? "white" : "",
        }}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className={`pointer-events-none relative z-10 ${
            hover ? " rotate-90 text-black" : "rotate-45 text-white"
          } text-7xl  transition-transform duration-700 ease-out`}
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
        </svg>
        <div
          className={`pointer-events-none absolute inset-0 z-0 ${
            hover ? "scale-100" : "scale-0"
          } rounded-full bg-white transition-transform duration-700 ease-out`}
        ></div>
        <svg
          width="200"
          height="200"
          className="pointer-events-none absolute z-10 animate-rotate"
          style={{
            top: "50%",
            left: "50%",
          }}
        >
          <path
            id="circlePath"
            d="M100,100 m-100,0 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0"
            fill="none"
          ></path>
          <text>
            <textPath
              href="#circlePath"
              fill="black"
              className={`fill-black text-lg font-normal tracking-[2px] uppercase ${
                hover ? "opacity-100" : "opacity-0"
              } transition-opacity duration-700 ease-out`}
            >
              Sign Up to Kickstart 🏆 your journey on GigSpark 🚀
            </textPath>
          </text>
        </svg>
      </button>
    </div>
  );
};

export default GetStartedBtn;
