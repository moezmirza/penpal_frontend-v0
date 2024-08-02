import React, { useEffect, useState } from "react";
import { useGet } from "../../api/useGet";
import { useNavigate } from "react-router-dom";
import FindUserCustomers from "./FindUserCustomers";

function ManageCustomers() {
  const [showTab, setShowTab] = useState(true);
  const endpoint = showTab ? "/created-customers" : "/favorite";
  
  return (
    <div className="flex flex-col gap-y-12 md:gap-y-16 mt-12 mb-32 p-4 md:p-0 relative ">
      <div className="flex flex-col gap-y-6  items-center justify-between">
        <h1 className="text-2xl md:text-4xl font-bold underline">Manage Profiles</h1>
        <div className="w-fit ">
          <div id="tabs" className="flex cursor-pointer">
            <div
              className={`rounded border  md:px-6 md:py-2 md:text-lg text-base px-3 py-1  ${
                showTab ? "bg-blue-900 text-white" : "bg-white text-black"
              }`}
              onClick={() => setShowTab(true)}
            >
              Listed
            </div>
            <div
              className={`rounded border md:px-5 md:py-2 md:text-lg text-base px-3 py-1  ${
                !showTab ? "bg-blue-900 text-white" : "bg-white text-black"
              }`}
              onClick={() => setShowTab(false)}
            >
              Favorites
            </div>
          </div>
        </div>
      </div>

      <FindUserCustomers endpoint={endpoint} key={endpoint} />

    </div>
  );
}
export default ManageCustomers;
