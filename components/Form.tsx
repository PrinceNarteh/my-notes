import dynamic from "next/dynamic";
import React from "react";
import "react-quill/dist/quill.snow.css";

const Form = () => {
  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
  return (
    <div>
      <ReactQuill theme="snow" />
    </div>
  );
};

export default Form;
