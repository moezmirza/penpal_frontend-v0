import React, { useEffect, useState } from "react";
import { useGet } from "../../api/useGet";
import { useNavigate } from "react-router-dom";
import FindUserCustomers from "./FindUserCustomers";

function ManageCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTab, setShowTab] = useState(true);

  const navigate = useNavigate();
  const get = useGet();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { success, data, error } = await get("/user/created-customers");
      if (success) {
        setLoading(false);
        setCustomers(data);

        console.log("data", data);
      } else {
        setLoading(false);

        console.log("error", error);
      }
    };
    fetchCustomers();
  }, []);
  const endpoint = showTab ? "/created-customers" : "/favorite";
  return (
    <div className="flex flex-col gap-y-12 md:gap-y-16 my-6 p-4 md:p-0 relative ">
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

      {/* <button
        onClick={() => navigate("/list-inmate")}
        className="flex justify-center items-center text-sm md:text-base mt-6 gap-4 m-auto bg-fr-blue-200  px-6  text-white py-3 text-lg rounded hover:opacity-90"
      >
        <img src="/assets/icons/plus.svg" alt="" className="md:h-6 h-4" />
        List Inmate{" "}
      </button> */}
    </div>
  );
}
export default ManageCustomers;
