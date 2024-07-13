import React from "react";

function RequiredFieldLabel({ labelText }) {
  return (
    <div className="flex gap-x-1 ">
      {labelText}
      <p className="text-red-500">*</p>
    </div>
  );
}

export { RequiredFieldLabel };
