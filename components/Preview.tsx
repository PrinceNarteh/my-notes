import React from "react";

const Preview = ({ open }: { open: boolean }) => {
  return (
    <div
      className={`h-[calc(100vh_-_40px)] w-96 bg-gray-800 duration-300 ${
        open ? "ml-72" : "ml-10"
      }`}
    >
      Preview
    </div>
  );
};

export default Preview;
