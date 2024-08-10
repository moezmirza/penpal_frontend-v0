import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { includesCaseInsensitive } from "../Admin/ApproveUpdates";
import { MultiSelectField } from "../../components/mainComponents/MultiSelectField";
import CustomerCard from "../../components/CustomerCard";

function SearchProfiles() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreMsg, setLoadMoreMsg] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [searchFilter, setSearchFilter] = useState([]);
  const inputRef = useRef();
  const itemsPerPage = 40;
  const get = useGet();
  const navigate = useNavigate();

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

  const filterFields = [
    "Premium",
    "Featured",
    "Recently updated",
    "Newly listed",
    "LGBTQ+",
    "Veteran",
    "Male",
    "Female",
    "View All",
  ];

  const filterFieldsKeyMap = {
    Premium: "premiumPlacement",
    Featured: "featuredPlacement",
    "Recently updated": "recentlyUpdated",
    "Newly listed": "newlyListed",
    "LGBTQ+": "orientation",
    Veteran: "race",
    Male: "gender",
    Female: "gender",
  };

  const stringFilters = ["LGBTQ+", "Veteran", "Male", "Female"];
  const boolFilters = [
    "Premium",
    "Featured",
    "Recently updated",
    "Newly listed",
  ];

  const handleFilterChange = (label, value, remove) => {
    console.log("label", label, "value", value, "remove", remove);
    if (remove) {
      setSearchFilter(searchFilter.filter((field) => field != value));
    } else {
      setSearchFilter([...searchFilter, value]);
    }
  };

  const filterCustomers = (customer) => {
    return searchFilter.some((field) => {
      if (stringFilters.includes(field)) {
        return customer["basicInfo"][filterFieldsKeyMap[field]] == field;
      }
      if (boolFilters.includes(field)) {
        return customer["customerStatus"][filterFieldsKeyMap[field]];
      }
      return true;
    });
  };

  let filteredCustomers =
    searchFilter.length == 0
      ? customers
      : customers?.filter((customer) => filterCustomers(customer));

  filteredCustomers = filteredCustomers?.filter(
    (customer) =>
      includesCaseInsensitive(customer?.basicInfo?.firstName, inputVal) ||
      includesCaseInsensitive(customer?.basicInfo?.lastName, inputVal)
  );

  return (
    <div className="flex flex-col gap-y-6  mt-12 mb-32  items-center justify-between  p-4 md:p-0 relative w-full">
      <h1 className="text-2xl md:text-4xl font-bold underline">
        Search Profiles
      </h1>
      <div className="flex flex-col gap-6 md:w-10/12 w-full ">
        <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
          <div className="w-full">
            <h1 className="text-lg">Dropdown Filter</h1>
            <MultiSelectField
              placeholderText={"Veteran"}
              dropdownOptions={filterFields}
              selectedOptions={searchFilter}
              onChange={handleFilterChange}
            />
          </div>

          <div className="w-full">
            <h1 className="text-lg ">Search Filter</h1>

            <input
              className="bg-transparent block w-full mt-1 rounded-md p-2 border border-gray-400 outline-none focus:border-gray-700 "
              placeholder={"Search by customer name..."}
              value={inputVal}
              ref={inputRef}
              onChange={(e) => setInputVal(e.target.value)}
            />
          </div>
        </div>
        <p className="font-semibold md:text-2xl">
          Total : {filteredCustomers.length}
        </p>
      </div>
      <LoadingSpinner isLoading={loading} />
      {filteredCustomers.length == 0 && !loading ? (
        <p className="text-center mt-6">{"No profiles to display"}</p>
      ) : (
        <div className="flex flex-col gap-y-6 w-full md:w-10/12">
          {filteredCustomers.map((customer, index) => (
            <CustomerCard
              customer={customer}
              key={index}
              onViewDetails={() => navigate(`/inmate/${customer?._id}`)}
            />
          ))}
        </div>
      )}
      {isLoadingMore ? (
        <p className="text-center">Loading...</p>
      ) : loadMoreMsg ? (
        <div className="text-center ">{loadMoreMsg}</div>
      ) : ( !loading &&
        <button
          type="button"
          className="mx-auto mt-4 border text-white px-4 md:px-5 py-2 md:py-3 bg-fr-blue-200 rounded-xl hover:opacity-90"
          onClick={handleFetchMoreCustomers}
        >
          View More ...
        </button>
      )}
    </div>
  );
}

export default SearchProfiles;
