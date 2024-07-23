import React, { useEffect, useState } from "react";
import { useGet } from "../../api/useGet";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";

function ManageCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {loading && <LoadingSpinner />}
      <h1 className="text-3xl font-bold underline">Manange Customers</h1>
      {customers.length == 0 && !loading ? (
        <p className="text-center">You have not listed any customers</p>
      ) : (
        <div className="flex flex-col gap-y-6">
          {customers.map((customer) => (
            <CustomerCard customer={customer} />
          ))}
        </div>
      )}
      <button
        onClick={() => navigate("/list-customer")}
        className="flex justify-center items-center gap-4 m-auto bg-fr-blue-200  px-6  text-white py-3 text-lg rounded hover:opacity-90"
      >
        <img src="/assets/icons/plus.svg" alt="" className="h-6" />
        List customer{" "}
      </button>
    </div>
  );
}
export default ManageCustomers;

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
          onClick={() => navigate(`/update-customer/${customer?._id}`)}
        >
          Update
        </button>
        <button
          type="button"
          className="mt-4 border text-black px-5 py-3 border-fr-blue-200 rounded hover:opacity-90"
          onClick={() => navigate(`/customer/${customer?._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
