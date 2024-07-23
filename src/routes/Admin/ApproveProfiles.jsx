import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { usePut } from "../../api/usePut";

function ApproveProfiles() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef();
  const get = useGet();
  const put = usePut();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { success, data, error } = await get(
        `/admin/customer?approved=${false}`
      );
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

  const handleApprovalUpdate = async (status, cid) => {
    setCustomers((customers) =>
      customers.filter((customer) => customer._id != cid)
    );
    put(`/admin/approve-customer?id=${cid}`).then((response) => {
      const { success, data, error } = response;
      if (success) {
        console.log("Approval update successful:", data);
      } else {
        console.error("Error approving customer:", error);
      }
    });
  };
  const approveAll = async () => {
    put(`/admin/approve-customer?id=${cid}`).then((response) => {
      const { success, data, error } = response;
      if (success) {
        console.log("Approval update successful:", data);
      } else {
        console.error("Error approving customer:", error);
      }
    });
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const includesCaseInsensitive = (str, substring) => {
    return str.toLowerCase().includes(substring.toLowerCase());
  };

  const filteredCustomers = customers?.filter(
    (customer) =>
      includesCaseInsensitive(customer.firstName, inputVal) ||
      includesCaseInsensitive(customer.lastName, inputVal)
  );
  return (
    <div className="flex flex-col gap-y-12 p-6 relative ">
      {loading && <LoadingSpinner />}
      <h1 className="text-3xl font-bold underline">Approve Profiles</h1>
      <div className="flex gap-6 w-9/12 items-center">
        <input
          className="bg-transparent block w-full mt-1 rounded-md p-2 border border-gray-400 outline-none focus:border-gray-700 "
          placeholder={"Search customer..."}
          value={inputVal}
          ref={inputRef}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <p className="text-nowrap text-xl">
          Total: {filteredCustomers?.length}
        </p>
      </div>
      {customers?.length == 0 && !loading ? (
        <p className="text-center">There are profiles to approve </p>
      ) : (
        <div className="flex flex-col gap-y-6">
          {filteredCustomers?.map((customer) => (
            <CustomerCard
              customer={customer}
              onApprove={handleApprovalUpdate}
            />
          ))}
        </div>
      )}
      {/* <button
        onClick={() => navigate("/list-customer")}
        className="flex justify-center items-center gap-4 m-auto bg-fr-blue-200  px-6  text-white py-3 text-lg rounded hover:opacity-90"
      >
        <img src="/assets/icons/plus.svg" alt="" className="h-6" />
        List customer{" "}
      </button> */}
    </div>
  );
}

function CustomerCard({ customer, onApprove }) {
  const navigate = useNavigate();
  return (
    <div
      id="customer-card"
      className="bg-gray-100 rounded-md border border-gray-300 p-2 px-4 w-full md:w-9/12 flex flex-col gap-y-6 gap-x-4 md:flex-row"
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
          className="mt-4 bg-green-600 text-white px-6 py-3 rounded hover:opacity-90"
          onClick={() => onApprove(true, customer._id)}
        >
          Approve
        </button>
        {/* <button
          type="button"
          className="mt-4 bg-red-600  text-black px-5 py-3  text-white rounded hover:opacity-90"
          onClick={() => navigate(`/customer/${customer?._id}`)}
        >
          Reject
        </button> */}
        <button
          type="button"
          className="mt-4 bg-fr-blue-200  text-black px-5 py-3  text-white rounded hover:opacity-90"
          onClick={() => navigate(`/admin/customer/${customer?._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default ApproveProfiles;
