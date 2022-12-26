import React from "react";

interface IInputField {
  label: string;
  type?: string;
}

const InputField = ({ label, type = "text" }: IInputField) => {
  return (
    <div className="my-1 flex-1">
      <label className="block mb-1">{label}</label>
      <input type={type} className="border w-full p-2 outline-none rounded" />
    </div>
  );
};

export default InputField;
