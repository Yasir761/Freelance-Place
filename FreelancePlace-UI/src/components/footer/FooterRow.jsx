import React from "react";

const FooterRow = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-4 flex justify-center items-center text-gray-500 text-sm">
      Made by{" "}
      <a
        href="https://www.codilad.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline ml-1"
      >
        Yasir
      </a>
    </div>
  );
};

export default FooterRow;
