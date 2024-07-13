import React from "react";

function SelectField({ labelText, name, value, onChange, options }) {
  return (
    <div className="relative inline-block w-full">
      <RequiredFieldLabel text={labelText} />

      <select
        id="gender"
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1 w-full p-2 border border-gray-400  outline-none focus:border-gray-700 rounded-md bg-transparent cursor-pointer ${
          value == "" ? "text-[#a9a9a9]" : "text-black"
        }`}
      >
        <option value={[]} disabled>
          Select Gender
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
