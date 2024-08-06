import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { includesCaseInsensitive } from "../Admin/ApproveUpdates";
import CustomerCard from "../../components/CustomerCard";

function UpdateCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreMsg, setLoadMoreMsg] = useState("");
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef();
  const itemsPerPage = 40;

  const get = useGet();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { success, data, error } = await get(
        `/customer?p=0&l=${itemsPerPage}`
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
  const handleFetchMoreCustomers = () => {
    // if (user?.profileComplete) {
    //  page start from zero
    const page =
      customers.length === itemsPerPage
        ? 1
        : Math.floor(customers.length / itemsPerPage) + 1;
    const fetchMoreCustomers = async () => {
      setIsLoadingMore(true);
      const { success, data, error } = await get(
        `/customer?p=${page}&l=${itemsPerPage}`
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
    // } else {
    //   setViewMorePopup(true);
    // }
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredCustomers = customers?.filter(
    (customer) =>
      includesCaseInsensitive(customer?.basicInfo?.firstName, inputVal) ||
      includesCaseInsensitive(customer?.basicInfo?.lastName, inputVal)
  );

  return (
    <div className="flex flex-col gap-y-6  items-center justify-between mt-12 mb-32  p-4 md:p-0 relative w-full">
      <h1 className="text-2xl md:text-4xl font-bold underline">
        Update/Renew Profiles
      </h1>
      <div className="flex flex-col md:flex-row gap-6 md:w-7/12 w-11/12 items-center">
        <input
          className="bg-transparent block w-full mt-1 rounded-md p-2 border border-gray-400 outline-none focus:border-gray-700 "
          placeholder={"Search customer..."}
          value={inputVal}
          ref={inputRef}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <p className="font-semibold md:text-2xl text-nowrap">
          Total: {filteredCustomers?.length}
        </p>
      </div>
      <LoadingSpinner isLoading={loading} />
      {filteredCustomers.length == 0 && !loading ? (
        <p className="text-center text-sm md:text-base">
          No profiles to display
        </p>
      ) : (
        <div className="flex flex-col gap-y-6 w-full md:w-9/12">
          {filteredCustomers.map((customer, index) => (
            <CustomerCard
              key={index}
              customer={customer}
              onUpdate={() => navigate(`/update-inmate/${customer?._id}`)}
              onRenew={() =>
                navigate(`/payment`, {
                  state: {
                    cid: customer?._id,
                    paymentDetails: {
                      renewal: true,
                      totalAmount: 79.95,
                    },
                  },
                })
              }
              showExpiresAt={true}
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

export default UpdateCustomers;
