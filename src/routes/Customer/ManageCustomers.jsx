import React, { useEffect, useState } from "react";
import { useGet } from "../../api/useGet";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import ListedCustomer from "./ListedCustomer";
import FavoriteCustomer from "./FavoriteCustomer";

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
  return (
    <div className="flex flex-col gap-y-12 md:gap-y-16 mt-6 md:mt-0 p-4 md:p-6 relative ">
      <div className="flex flex-col gap-y-6 md:items-center md:flex-row md:w-3/5 justify-between">
        <h1 className="text-3xl font-bold underline">Manange Inmates</h1>
        <div className="md:w-fit w-full ">
          <div id="tabs" className="flex cursor-pointer">
            <div
              className={`rounded border  md:px-8 md:py-2 md:text-lg text-base px-4 py-2  ${
                showTab ? "bg-blue-900 text-white" : "bg-white text-black"
              }`}
              onClick={() => setShowTab(true)}
            >
              Listed
            </div>
            <div
              className={`rounded border md:px-8 md:py-2 md:text-lg text-base px-4 py-2  ${
                !showTab ? "bg-blue-900 text-white" : "bg-white text-black"
              }`}
              onClick={() => setShowTab(false)}
            >
              Favorites
            </div>
          </div>
        </div>
      </div>

      {showTab ? <ListedCustomer /> : <FavoriteCustomer />}

      <button
        onClick={() => navigate("/list-inmate")}
        className="flex justify-center items-center text-sm md:text-base mt-6 gap-4 m-auto bg-fr-blue-200  px-6  text-white py-3 text-lg rounded hover:opacity-90"
      >
        <img src="/assets/icons/plus.svg" alt="" className="md:h-6 h-4" />
        List Inmate{" "}
      </button>
    </div>
  );
}
export default ManageCustomers;
