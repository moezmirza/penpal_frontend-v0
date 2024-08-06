import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useDel } from "../../api/useDel";
import ConfrimPopup from "../../components/ConfrimPopup";
import { includesCaseInsensitive } from "./ApproveUpdates";
import CustomerCard from "../../components/CustomerCard";

function DeleteProfiles() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreMsg, setLoadMoreMsg] = useState("");
  const clientId = useRef();
  const inputRef = useRef();
  const itemsPerPage = 40;

  const get = useGet();
  const del = useDel();
  const navigate = useNavigate();

  const handleFetchMoreCustomers = () => {
    const page =
      customers.length === itemsPerPage
        ? 1
        : Math.floor(customers.length / itemsPerPage) + 1;
    const fetchMoreCustomers = async () => {
      setIsLoadingMore(true);
      const { success, data, error } = await get(
        `/admin/customer?p=${page}&l=${itemsPerPage}`
      );
      if (success) {
        setIsLoadingMore(false);
        if (data.length == 0) {
          setLoadMoreMsg("No more profiles found.");
        }
        console.log("more customers data", data);
        setCustomers([...customers, ...data]);
      } else {
        setLoadMoreMsg("Error loading matches");
        setIsLoadingMore(false);
      }
    };
    fetchMoreCustomers();
  };

  const handleDeleteProfile = (cid) => {
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

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { success, data, error } = await get(
        `/admin/customer?p=0&l=${itemsPerPage}`
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
  const filteredCustomers = customers?.filter(
    (customer) =>
      includesCaseInsensitive(customer.basicInfo?.firstName, inputVal) ||
      includesCaseInsensitive(customer.basicInfo?.lastName, inputVal)
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
          {filteredCustomers?.map((customer, index) => (
            <CustomerCard
              key={index}
              customer={customer}
              onProfileDeletion={handleDeleteProfile}
              onViewDetails={() =>
                navigate(`/admin/inmate/${customer?._id}`)
              }
            />
          ))}
        </div>
      )}
      {isLoadingMore ? (
        <p className="text-center">Loading...</p>
      ) : loadMoreMsg ? (
        <div className="text-center ">{loadMoreMsg}</div>
      ) : (
        !loading &&
        <button
          type="button"
          className="mx-auto mt-4 border text-white px-5 py-3 bg-fr-blue-200 rounded-xl hover:opacity-90"
          onClick={handleFetchMoreCustomers}
        >
          View More ...
        </button>
      )}
    </div>
  );
}



export default DeleteProfiles;
