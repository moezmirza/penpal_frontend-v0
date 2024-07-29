import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";

function ListedCustomer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTab, setShowTab] = useState(true);

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
    <div className="flex flex-col gap-y-6  items-center justify-between my-6 p-4 md:p-0 relative w-full">
      <h1 className="text-4xl font-bold underline">Update Inmates</h1>
      <LoadingSpinner isLoading={loading} />
      {customers.length == 0 && !loading ? (
        <p className="text-center">You have not listed any inmates</p>
      ) : (
        <div className="flex flex-col gap-y-6 w-full">
          {customers.map((customer, index) => (
            <CustomerCard key={index} customer={customer} />
          ))}
        </div>
      )}
    </div>
  );
}

function CustomerCard({ customer }) {
  const navigate = useNavigate();
  const profileApproved = customer?.profileApproved==false;
  const updateApproved = customer?.updateApproved==false;
  const infoText = profileApproved
    ? "Profile approval needed"
    : updateApproved && "Updates approval needed";
  return (
    <div
      id="customer-card"
      className={`bg-gray-100 rounded-md border ${
        profileApproved == false || updateApproved == false
          ? "border-red-500"
          : "border-gray-300"
      }  p-2 px-4 w-full md:w-10/12 mx-auto flex flex-col gap-y-6 gap-x-4 md:flex-row`}
    >
      <img
        src={customer?.imageUrl || "/assets/default.jpg"}
        alt=""
        className="h-80 w-full md:w-44 md:h-44 rounded"
      />
      <div className="flex flex-col gap-y-3 md:w-7/12 w-full ">
        <div>
          <div className=" flex flex-col items-center md:flex-row gap-2 ">
            <p className="font-semibold md:text-3xl text-lg mb-4 md:mb-1">
              {customer?.firstName} {customer?.lastName}
            </p>
            {(profileApproved == false || updateApproved == false) && (
              <p className="text-red-500 text-sm font-normal">{infoText}</p>
            )}
          </div>

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
          <span className="font-medium mr-1">Inmate#:</span>
          {customer?.inmateNumber || "N/A"}
        </p>
        <p>
          <span className="font-medium mr-1"> Expires on:</span>
          {customer?.expiresAt || "N/A"}
        </p>
        <p>
          <span className="font-medium mr-1"> Mainling Addres:</span>
          {customer?.mailingAddress || "N/A"}
        </p>
      </div>
      <div className="w-full md:w-fit ml-auto flex flex-col my-auto">
        <button
          type="button"
          className="mt-4 bg-green-600 text-white text-base md:text-lg  px-8 py-3 rounded hover:opacity-90"
          onClick={() =>
            navigate(`/payment`, {
              state: {
                cid: customer?._id,
                paymentsDetails: {
                  renewal: customer?.pendingPayments?.renewal,
                  totalAmount: 79.95,
                },
              },
            })
          }
        >
          Renew
        </button>
        <button
          type="button"
          className="mt-4 bg-fr-blue-200 text-white text-base md:text-lg  px-8 py-3 rounded hover:opacity-90"
          onClick={() => navigate(`/update-inmate/${customer?._id}`)}
        >
          Update
        </button>
        {/* <button
          type="button"
          className="mt-4 border text-black px-5 py-3 border-fr-blue-200 rounded hover:opacity-90"
          onClick={() => navigate(`/inmate/${customer?._id}`)}
        >
          View Details
        </button> */}
      </div>
    </div>
  );
}

export default ListedCustomer;
