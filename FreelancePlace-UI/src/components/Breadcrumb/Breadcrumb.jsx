import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import BreadcrumbsItem from "./BreadcrumbsItem";


const Breadcrumbs = ({ children, links }) => {
  return (
    <nav
      className="flex justify-between py-1 text-gray-700 overflow-auto scrollbar-hidden"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <AiFillHome className="mx-1" />
            Home
          </Link>
        </li>
        {links.map((item, index) => (
          <BreadcrumbsItem key={index} info={item} />
        ))}
      </ol>
      {children}
    </nav>
  );
};

export default Breadcrumbs;
