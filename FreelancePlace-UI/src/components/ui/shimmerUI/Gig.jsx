import React from "react";
import Breadcrumbs from "../../Breadcrumb/Breadcrumb";

const GigShimmerUi = () => {
  return (
    <section className="bg-gray-50 p-4 px-8 sm:p-6">
      <div className="px-4 pt-20 relative max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
        <div className="absolute top-0 left-0 w-full px-4">
          <Breadcrumbs links={[{ text: "gig" }]} />
        </div>
        <aside className="grow max-w-3xl w-full">
          <div className="p-6 max-w-7xl mx-auto space-y-10">
            <div className="h-6 bg-gray-300 rounded-md animate-pulse ">
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-gray-300 rounded-xl animate-pulse flex items-center justify-center">
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-1/4"></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded-md animate-pulse w-2/3"></div>
              <div className="h-32 bg-gray-300 rounded-md animate-pulse"></div>
            </div>

            <div>
              <div className="h-6 bg-gray-300 rounded-md animate-pulse w-1/2"></div>
              <div className="h-20 bg-gray-300 rounded-md animate-pulse mt-4"></div>
            </div>

            <div className="space-y-4">
              <div className="h-6 bg-gray-300 rounded-md animate-pulse w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-2/4"></div>
              </div>
            </div>

            <div>
              <div className="h-6 bg-gray-300 rounded-md animate-pulse w-1/4"></div>
              <div className="space-y-2 mt-4">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-full"></div>
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-2/3"></div>
              </div>
            </div>
          </div>
        </aside>
        <aside className="w-full max-w-3xl max-lg:hidden lg:basis-1/3 lg:sticky lg:top-48 animate-pulse border border-gray-300 p-4 rounded-lg">
            <div className="h-full ">
              <div className="p-6">
                <h2 className="bg-gray-400 animate-pulse h-4 w-1/4 mb-2"></h2>
                <h1 className="w-1/2 mb-8 h-6 animate-pulse bg-gray-500"></h1>
                <p className="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-400"></p>
                <p className="leading-relaxed mb-3 w-2/3 h-3 animate-pulse bg-gray-400"></p>
                <p className="leading-relaxed mb-8 w-1/2 h-3 animate-pulse bg-gray-400"></p>
                <div className="flex items-center flex-wrap ">
                  <span className="bg-gray-300 h-6 animate-pulse mt-2 w-32 inline-flex items-center md:mb-2 lg:mb-0"></span>
                  <span className="bg-gray-300 w-16 mt-2 h-6 animate-pulse mr-3 px-2 inline-flex items-center ml-auto leading-none text-sm pr-5 py-1"></span>
                </div>
              </div>
            </div>
        </aside>
      </div>
    </section>
  );
};

export default GigShimmerUi;
