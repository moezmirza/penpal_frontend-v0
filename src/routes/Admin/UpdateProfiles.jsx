import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useDel } from "../../api/useDel";
import ConfrimPopup from "../../components/ConfrimPopup";
import { includesCaseInsensitive } from "./ApproveUpdates";
import CustomerCard from "../../components/CustomerCard";
import { itemsPerPage, nextPageNumber } from "../../utils/config";

function UpdateProfiles() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreMsg, setLoadMoreMsg] = useState("");
  const clientId = useRef();
  const inputRef = useRef();

  const get = useGet();
  const del = useDel();
  const navigate = useNavigate();

  const handleFetchMoreCustomers = () => {
    const page = nextPageNumber(customers.length)
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
    <div className="flex flex-col items-center gap-y-12 relative my-6  mx-auto">
      <LoadingSpinner isLoading={loading} />
      <h1 className="md:text-3xl text-2xl font-bold underline">
        Update Profiles
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
        <p className="text-center">There are no more profiles to update </p>
      ) : (
        <div className="flex flex-col gap-y-6 w-full xl:w-10/12 px-4 md:px-8  ">
          {filteredCustomers?.map((customer, index) => (
            <CustomerCard
              key={index}
              customer={customer}
              onViewDetails={() => navigate(`/admin/inmate/${customer?._id}`)}
              onUpdate={() => navigate(`/admin/update-inmate/${customer?._id}`)}
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
          className="mx-auto mt-4 border text-white px-4 md:px-5 py-2 md:py-3 bg-fr-blue-100 rounded-xl hover:opacity-90"
          onClick={handleFetchMoreCustomers}
        >
          View more
        </button>
      )}
    </div>
  );
}



export default UpdateProfiles;
