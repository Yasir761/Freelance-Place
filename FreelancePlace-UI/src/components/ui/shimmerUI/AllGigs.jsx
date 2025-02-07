import React from "react";
import Breadcrumbs from "../../Breadcrumb/Breadcrumb";
import { FaCircleUser } from "react-icons/fa6";

const AllGigsShimmerUi = () => {
  const GigsCard = Array(4).fill(0);

  return (
    <section className="max-w-screen-xl p-4 pt-10 px-8 mx-auto bg-gray-50 pb-28 animate-pulse">
      <Breadcrumbs
        links={[
          { text: "category" },
          {
            text: (
              <p className="h-3 w-20 rounded-full bg-gray-300 animate-pulse"></p>
            ),
          },
        ]}
      />
      <h1 className="h-6 rounded-full bg-gray-300 mt-6 max-w-72 mb-4"></h1>
      <p className="h-2.5 w-full bg-gray-300 mt-0.5 mb-2 rounded-full"></p>
      <p className="h-2.5 w-full bg-gray-300 mt-0.5 mb-2 rounded-full"></p>
      <p className="h-2.5 w-1/4 bg-gray-300 mt-0.5 mb-8 rounded-full"></p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-6 md:gap-y-16 py-6">
        {GigsCard.map((card, index) => (
          <div
            key={index}
            role="status"
            className="max-w-sm p-4 border border-gray-300 rounded-md shadow animate-pulse md:p-6 dark:border-gray-700"
          >
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              </svg>
            </div>
            <div className="flex items-center mt-4 mb-3">
              <FaCircleUser className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" />
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
            <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-48 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-1.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            {/* <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div> */}
            <span className="sr-only">Loading...</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllGigsShimmerUi;