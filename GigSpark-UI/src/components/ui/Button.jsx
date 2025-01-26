import React from "react";
import {cn} from "../../lib/utils"

const Button = ({ onClick, className = "", children, disabled }) => {
  return (
    <button
      className={cn("disabled:cursor-not-allowed cursor-pointer active:scale-90 transition-all duration-200",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
