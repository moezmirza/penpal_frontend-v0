import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { includesCaseInsensitive } from "../Admin/ApproveUpdates";
import { MultiSelectField } from "../../components/mainComponents/MultiSelectField";

function SearchProfiles() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [matchesAlert, setMatchesAlert] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [searchFilter, setSearchFilter] = useState([]);
  const inputRef = useRef();
  const itemsPerPage = 20;

  const get = useGet();
  console.log("window.location", window.location.search);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const filter = urlParams.get("find") ? urlParams.get("find") : "all";
  console.log("search filter", "all");

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { success, data, error } = await get(
        `/user/favorite?p=0&l=${itemsPerPage}`
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
        `/user/favorite?p=${page}&l=${itemsPerPage}`
      );
      if (success) {
        setIsLoadingMore(false);
        if (data.length == 0) {
          setMatchesAlert("No more profiles found.");
        }
        console.log("more customers data", data);
        setCustomers([...customers, ...data]);
      } else {
        setMatchesAlert("Error loading matches");
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
    Featured: "premiumPlacement",
    "Recently updated": "recentlyUploaded",
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
      setSearchFilter([]);
    } else {
      setSearchFilter([value]);
    }
  };
  let filteredCustomers = customers?.filter((customer) => {
    if (stringFilters.includes(searchFilter[0])) {
      return customer[filterFieldsKeyMap[searchFilter[0]]] == searchFilter[0];
    }
    if (boolFilters.includes(searchFilter[0]))
      return customer[filterFieldsKeyMap[searchFilter[0]]];

    return true;
  });

  filteredCustomers = filteredCustomers?.filter(
    (customer) =>
      includesCaseInsensitive(customer.firstName, inputVal) ||
      includesCaseInsensitive(customer.lastName, inputVal)
  );

  return (
    <div className="flex flex-col gap-y-6  my-12 items-center justify-between  p-4 md:p-0 relative w-full">
      <h1 className="text-4xl font-bold underline">Penpal Profiles</h1>
      <div className="flex flex-col md:flex-row gap-6 md:w-10/12 w-11/12 items-center">
        <div className="flex justify-between gap-x-6 w-full">
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
      </div>
      <LoadingSpinner isLoading={loading} />
      {filteredCustomers.length == 0 && !loading ? (
        <p className="text-center">{"No profiles to display"}</p>
      ) : (
        <div className="flex flex-col gap-y-6 w-full">
          {filteredCustomers.map((customer, index) => (
            <CustomerCard customer={customer} key={index} />
          ))}
        </div>
      )}
      {isLoadingMore ? (
        <p className="text-center">Loading...</p>
      ) : matchesAlert ? (
        <div className="text-center ">{matchesAlert}</div>
      ) : (
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

function CustomerCard({ customer }) {
  const navigate = useNavigate();
  return (
    <div
      id="customer-card"
      className={`bg-gray-100 rounded-md border "border-gray-300" p-2 px-4 w-full md:w-10/12 mx-auto flex flex-col gap-y-6 gap-x-4 md:flex-row`}
    >
      <img
        src={customer?.imageUrl || "/assets/default.jpg"}
        alt=""
        className="h-auto w-full md:w-44 md:h-44 rounded"
      />
      <div className="flex flex-col gap-y-3 md:w-7/12 w-full ">
        <div className=" ">
          <div className=" flex flex-col items-center md:flex-row gap-2 ">
            <p className="font-semibold md:text-3xl text-lg mb-4 md:mb-1">
              {customer?.firstName} {customer?.lastName}
            </p>
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
        {/* <button
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
        </button> */}
      </div>
    </div>
  );
}

export default SearchProfiles;
