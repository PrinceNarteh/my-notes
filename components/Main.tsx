import React from "react";
import Form from "./Form";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-700h-[calc(100vh_-_40px)] p-5 flex-1 rounded-r-2xl">
      {children}
    </div>
  );
};

export default Main;
