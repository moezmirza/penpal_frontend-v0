import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { mailTOLink } from "../User/FindPal/FindPal";

function FavoriteCustomer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTab, setShowTab] = useState(true);

  const get = useGet();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { success, data, error } = await get("/user/favorite");
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
    <div className="relative ">
      {loading && <LoadingSpinner />}
      {customers.length == 0 && !loading ? (
        <p className="text-center">You have not listed any inmates</p>
      ) : (
        <div className="flex flex-col gap-y-6">
          {customers.map((customer) => (
            <CustomerCard customer={customer} />
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
      className="bg-gray-100 rounded-md border border-gray-300 p-2 px-4 w-full md:w-10/12 flex flex-col gap-y-6 gap-x-4 md:flex-row"
    >
      <img
        src={customer?.imageUrl || "/assets/default.jpg"}
        alt=""
        className="h-auto w-full md:w-44 md:h-44 rounded"
      />
      <div className="flex flex-col gap-y-3 md:w-7/12 w-full ">
        <div className=" ">
          <p className="font-semibold md:text-3xl text-lg mb-4 md:mb-1">
            {customer?.firstName} {customer?.lastName}
          </p>

          <div className="flex gap-x-4">
            <p className="hidden md:block">{customer?.age || "N/A"} yrs</p>
            <p className="hidden md:block">{customer?.gender || "N/A"}</p>
            <p className="hidden md:block">{customer?.orientation || "N/A"}</p>
            <p className="hidden md:block">{customer?.race || "N/A"}</p>
            <span className="flex gap-x-1 items-baseline">
              <img src="/assets/icons/star.svg" alt="" className="h-4" />{" "}
              {customer?.rating || 0}
            </span>
            <p className="underline">{customer?.numRatings || 0} Reviews</p>
          </div>
        </div>
        <p>
          <span className="font-medium mr-1">Location:</span>
          {customer?.state || "N/A"}, {customer?.city || "N/A"}
        </p>
        <p>
          <span className="font-medium mr-1">Education:</span>
          {customer?.education || "N/A"}
        </p>
        <p>
          <span className="font-medium mr-1"> Mainling Addres:</span>
          {customer?.mailingAddress || "N/A"}
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
        <button
          type="button"
          className="mt-4 border text-black px-5 py-3 border-fr-blue-200 rounded hover:opacity-90"
          onClick={() =>
            (window.location.href = mailTOLink(
              customer?.email,
              customer.firstName
            ))
          }
        >
          Contact Inmate
        </button>
      </div>
    </div>
  );
}

export default FavoriteCustomer;
