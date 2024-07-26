import React from "react";

function CallSupport() {
  return (
    <a
      href="tel:5555555555"
      title="Call support "
      className="bg-green-600 text-white  md:p-5 p-3 w-fit rounded-lg fixed top-[90%] md:top-[86%] right-[2%] cursor-pointer "
    >
      <img src="/assets/icons/call.svg" alt="" className=" h-6 md:h-8" />
    </a>
  );
}

export default CallSupport;
