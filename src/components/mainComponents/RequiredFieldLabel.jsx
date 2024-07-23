import React from "react";

function RequiredFieldLabel({ labelText, required }) {
  return (
    <div className="flex gap-x-1 ">
      {labelText}
      {required && <p className="text-red-500">*</p>}
    </div>
  );
}

export { RequiredFieldLabel };
