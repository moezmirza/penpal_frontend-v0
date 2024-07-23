import React from "react";
import { RequiredFieldLabel } from "./RequiredFieldLabel";

function InputField({
  labelText,
  type,
  placeholder,
  name,
  value,
  onChange,
  required,
}) {
  console.log("label", labelText, "name", name, "required", required);
  return (
    <div>
      <RequiredFieldLabel labelText={labelText} required={required} />

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 "
      />
    </div>
  );
}

export { InputField };
