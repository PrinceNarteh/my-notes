import React from "react";

type IInputField = {
  label: string;
  type?: string;
  name: string;
} & React.HTMLAttributes<HTMLInputElement>;

const InputField = ({ label, name, type = "text", ...props }: IInputField) => {
  return (
    <div className="my-1 flex-1">
      <label className="block mb-1">{label}</label>
      <input
        name={name}
        type={type}
        className="border w-full p-2 outline-none rounded"
        {...props}
      />
    </div>
  );
};

export default InputField;
