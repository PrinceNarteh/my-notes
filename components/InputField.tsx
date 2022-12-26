import React from "react";

interface IInputField {
  label: string;
  type?: string;
}

const InputField = ({ label, type = "text" }: IInputField) => {
  return (
    <div className="my-2">
      <label className="block text-xl mb-1">{label}</label>
      <input type={type} className="border w-full p-2 outline-none rounded" />
    </div>
  );
};

export default InputField;
