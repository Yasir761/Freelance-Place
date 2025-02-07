import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";

const CustomToggle = ({setValue}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setValue("isSeller", !isChecked)
  };

  return (
    <>
      <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          name="autoSaver"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={` mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            isChecked ? "bg-black" : "bg-[#CCCCCE]"
          }`}
        >
          <span
            className={`h-[20px] w-[20px] rounded-full text-black bg-white duration-200 transform ${
              isChecked ? "translate-x-[24px]" : "translate-x-0"
            } flex items-center justify-center p-0.5`}
          >
            {
                !isChecked ? <IoCloseCircleOutline className="text-xl"/> : <FaCircleCheck className="text-xl"/>
            }
          </span>
        </span>
      </label>
    </>
  );
};

export default CustomToggle;
