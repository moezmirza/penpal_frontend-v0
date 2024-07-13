import React from "react";

function InputField({ labelText, type, placeholder, name, value, onChange }) {
  return (
    <label>
      <RequiredFieldLabel text={labelText} />

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 "
      />
    </label>
  );
}

export { InputField };
