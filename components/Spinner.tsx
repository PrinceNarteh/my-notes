import React from "react";
import { ImSpinner2 } from "react-icons/im";

const Spinner = ({ additionalStyle }: { additionalStyle?: string }) => {
  return (
    <div role="status">
      <ImSpinner2 className={`${additionalStyle} animate-spin`} />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
