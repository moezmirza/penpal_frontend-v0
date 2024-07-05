import React from "react";

export default function Separater({ text }) {
  return (
    <div className="flex items-center justify-center mt-2 w-full">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-gray-500">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}
