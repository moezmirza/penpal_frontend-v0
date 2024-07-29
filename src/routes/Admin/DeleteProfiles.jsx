import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useDel } from "../../api/useDel";
import ConfrimPopup from "../../components/ConfrimPopup";

function DeleteProfiles() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const clientId = useRef();
  const inputRef = useRef();
  const get = useGet();
  const del = useDel();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { success, data, error } = await get(`/admin/customer`);
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

  const handleDelUpdate = (cid) => {
    setShowPopup(true);
    clientId.current = cid;
  };
  const delProfile = () => {
    setCustomers((customers) =>
      customers.filter((customer) => customer._id != clientId?.current)
    );
    setShowPopup(false);
    del(`/customer?id=${clientId?.current}`).then((response) => {
      const { success, data, error } = response;
      if (success) {
        console.log("customer deletion successful:", data);
      } else {
        console.error("Error deletiting customer:", error);
      }
      clientId.current = null;
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
    <div className="flex flex-col items-center gap-y-12 p-4 md:p-6 relative mt-6 md:w-10/12 w-full  mx-auto">
      <LoadingSpinner isLoading={loading} />
      {showPopup && (
        <ConfrimPopup
          onCloseClick={setShowPopup}
          onConfirm={delProfile}
          confirmBtnTxt={"Delete profile"}
          infoText={"It will permanently delete prison profile"}
          confirmBtnColor="red"
        />
      )}
      <h1 className="md:text-3xl text-2xl font-bold underline">
        Delete Profiles
      </h1>
      <div className="flex flex-col md:flex-row gap-6 md:w-9/12 w-11/12 items-center">
        <input
          className="bg-transparent block w-full mt-1 rounded-md p-2 border border-gray-400 outline-none focus:border-gray-700 "
          placeholder={"Search customer..."}
          value={inputVal}
          ref={inputRef}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <p className="text-nowrap text-xl mr-auto">
          Total: {filteredCustomers?.length}
        </p>
      </div>
      {customers?.length == 0 && !loading ? (
        <p className="text-center">There are no more profiles to delete </p>
      ) : (
        <div className="flex flex-col gap-y-6 w-full">
          {filteredCustomers?.map((customer) => (
            <CustomerCard customer={customer} onDel={handleDelUpdate} />
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

function CustomerCard({ customer, onDel }) {
  const navigate = useNavigate();
  return (
    <div
      id="customer-card"
      className="bg-gray-100 rounded-md border border-gray-300 py-2 px-4 w-full flex flex-col gap-y-6 gap-x-4 md:flex-row"
    >
      <img
        src={customer?.imageUrl || "/assets/default.jpg"}
        alt=""
        className="h-80 w-full md:w-44 md:h-44 rounded"
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
          <span className="font-medium mr-1">Inmate#:</span>
          {customer?.inmateNumber || "N/A"}
        </p>
        <p>
          <span className="font-medium mr-1">Location:</span>
          {customer?.state || "N/A"}, {customer?.city || "N/A"}
        </p>
        <p>
          <span className="font-medium mr-1"> Mainling Addres:</span>
          {customer?.mailingAddress || "N/A"}
        </p>
      </div>
      <div className="w-full md:w-fit ml-auto flex flex-col my-auto">
        <button
          type="button"
          className="mt-4 bg-red-600 text-white px-6 py-3 rounded hover:opacity-90"
          onClick={() => onDel(customer._id)}
        >
          Delete
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
          onClick={() => navigate(`/admin/inmate-profile/${customer?._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default DeleteProfiles;
