import React from "react";
import { ImSpinner2 } from "react-icons/im";

const Spinner = () => {
  return (
    <div role="status">
      <ImSpinner2 className="animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
