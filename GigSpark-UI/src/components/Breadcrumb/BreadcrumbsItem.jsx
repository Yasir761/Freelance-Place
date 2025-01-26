import React from "react";
import { Link } from "react-router-dom";

const BreadcrumbsItem = ({ info }) => {
  return (
    <li aria-current="page">
      <div className="flex items-center h-fit text-nowrap mx-1">
        <span className="h-4 w-[2px] rounded-md rotate-12 bg-gray-500 inline-block"></span>
        {!info.href ? (
          <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400 capitalize">
            {info.text}
          </span>
        ) : (
          <Link
            to={info.href}
            className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 capitalize dark:hover:text-white"
          >
            {info.text}
          </Link>
        )}
      </div>
    </li>
  );
};

export default BreadcrumbsItem;
