import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { mailTOLink } from "../User/FindPal/FindPal";

function FindUserCustomers({ endpoint }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTab, setShowTab] = useState(true);

  const get = useGet();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { success, data, error } = await get(`/user${endpoint}`);
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
    <div className="flex flex-col gap-y-6  items-center justify-between  p-4 md:p-0 relative w-full">
      {/* <h1 className="text-4xl font-bold underline">Favorite Inmates</h1>{" "} */}
      <LoadingSpinner isLoading={loading} />
      {customers.length == 0 && !loading ? (
        <p className="text-center">{"No profiles to display"}</p>
      ) : (
        <div className="flex flex-col gap-y-6 w-full">
          {customers.map((customer, index) => (
            <CustomerCard customer={customer} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

function CustomerCard({ customer }) {
  const navigate = useNavigate();
  return (
    <div
      id="customer-card"
      className={`bg-gray-100 rounded-md border "border-gray-300" p-2 px-4 w-full md:w-10/12 mx-auto flex flex-col gap-y-6 gap-x-4 md:flex-row`}
    >
      <img
        src={customer?.photos?.imageUrl || "/assets/default.jpg"}
        alt=""
        className="h-auto w-full md:w-44 md:h-44 rounded"
      />
      <div className="flex flex-col gap-y-3 md:w-7/12 w-full ">
        <div className=" ">
          <div className=" flex flex-col items-center md:flex-row gap-2 ">
            <p className="font-semibold md:text-3xl text-lg mb-4 md:mb-1">
              {customer?.basicInfo?.firstName} {customer?.basicInfo?.lastName}
            </p>
          </div>

          <div className="flex gap-x-4">
            <p className="hidden md:block">{customer?.basicInfo?.age || "N/A"} yrs</p>
            <p className="hidden md:block">{customer?.basicInfo?.gender || "N/A"}</p>
            <p className="hidden md:block">{customer?.basicInfo?.orientation || "N/A"}</p>
            <p className="hidden md:block">{customer?.basicInfo?.race || "N/A"}</p>
            <span className="flex gap-x-1 items-baseline">
              <img src="/assets/icons/star.svg" alt="" className="h-4" />{" "}
              {customer?.basicInfo?.rating || 0}
            </span>
            <p className="underline">{customer?.basicInfo?.numRatings || 0} Reviews</p>
          </div>
        </div>
        <p>
          <span className="font-medium mr-1">Location:</span>
          {customer?.basicInfo?.state || "N/A"}, {customer?.basicInfo?.city || "N/A"}
        </p>
        <p>
          <span className="font-medium mr-1">Education:</span>
          {customer?.basicInfo?.education || "N/A"}
        </p>
        <p>
          <span className="font-medium mr-1"> Mainling Addres:</span>
          {customer?.basicInfo?.mailingAddress || "N/A"}
        </p>
      </div>
      <div className="w-full md:w-fit ml-auto flex flex-col my-auto">
        <button
          type="button"
          className="mt-4 bg-fr-blue-200 text-white px-6 py-3 rounded hover:opacity-90"
          onClick={() => navigate(`/inmate/${customer?._id}`)}
        >
          View Details
        </button>
        {/* <button
          type="button"
          className="mt-4 border text-black px-5 py-3 border-fr-blue-200 rounded hover:opacity-90"
          onClick={() =>
            (window.location.href = mailTOLink(
              customer?.basicInfo?.email,
              customer.firstName
            ))
          }
        >
          Contact Inmate
        </button> */}
      </div>
    </div>
  );
}

export default FindUserCustomers;
