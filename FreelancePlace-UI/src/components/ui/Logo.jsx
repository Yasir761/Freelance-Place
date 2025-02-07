import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ className="", src }) => {
  return (
    <Link to={"/"}>
      <img src={src} alt="" className={`w-32 sm:w-40 ${className}`}/>
      
      
    </Link>
  );
};

export default Logo;
