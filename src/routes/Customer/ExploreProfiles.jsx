import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { includesCaseInsensitive } from "../Admin/ApproveUpdates";
import { MultiSelectField } from "../../components/mainComponents/MultiSelectField";
import CustomerCard from "../../components/CustomerCard";
import PageHeader from "../../components/PageHeader";
import { itemsPerPage } from "../../utils/config";

function SearchProfiles() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreMsg, setLoadMoreMsg] = useState("");
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef();
  const get = useGet();
  const navigate = useNavigate();
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const filter = queryParams.get("search") ? (queryParams.get("search")).trim() : ""
  const filterFields = [
    "premiumPlacement",
    "featuredPlacement",
    "recentlyUpdated",
    "newlyListed",
    "lgbtq",
    "veteran",
    "male",
    "female",
    "viewAll",
  ];
  const lqbtqFilter = "lgbtq%2B"
  console.log("filter", JSON.stringify(filter), filter == "lgbtq", filterFields.includes(filter))
  const option = filterFields.includes(filter) ? filter == "lgbtq" ? lqbtqFilter : filter : "viewAll"

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { success, data, error } = await get(
        `/customer?p=0&l=${itemsPerPage}&options=${option}`
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
  }, [filter]);
  const handleFetchMoreCustomers = () => {
    // if (user?.profileComplete) {
    //  page start from zero
    const page = nextPageNumber(customers.length)
    const fetchMoreCustomers = async () => {
      setIsLoadingMore(true);
      const { success, data, error } = await get(
        `/customer?p=${page}&l=${itemsPerPage}&options=${option}`
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

  // const filterFields = [
  //   "Premium",
  //   "Featured",
  //   "Recently updated",
  //   "Newly listed",
  //   "LGBTQ+",
  //   "Veteran",
  //   "Male",
  //   "Female",
  //   "View All",
  // ];
  // const filterFieldStateMap = {
  //   "premiumPlacement": "Premium",
  //   "featuredPlacement": "Featured",
  //   recentlyUpdated: "Recently updated",
  //   newlyListed: "Newly listed",
  //   "lgbtq": "LGBTQ+",
  //   veteran: "Veteran",
  //   male: "Male",
  //   female: "Female",
  // }

  // const filterFieldsKeyMap = {
  //   Premium: "premiumPlacement",
  //   Featured: "featuredPlacement",
  //   "Recently updated": "recentlyUpdated",
  //   "Newly listed": "newlyListed",
  //   "LGBTQ+": "orientation",
  //   Veteran: "race",
  //   Male: "gender",
  //   Female: "gender",
  // };

  // const stringFilters = ["LGBTQ+", "Veteran", "Male", "Female"];
  // const boolFilters = [
  //   "Premium",
  //   "Featured",
  //   "Recently updated",
  //   "Newly listed",
  // ];

  // const handleFilterChange = (label, value, remove) => {
  //   console.log("label", label, "value", value, "remove", remove);
  //   if (remove) {
  //     setSearchFilter(searchFilter.filter((field) => field != value));
  //   } else {
  //     setSearchFilter([...searchFilter, value]);
  //   }
  // };

  // const filterCustomers = (customer) => {
  //   return searchFilter.some((field) => {
  //     if (stringFilters.includes(field)) {
  //       return customer["basicInfo"][filterFieldsKeyMap[field]] == field;
  //     }
  //     if (boolFilters.includes(field)) {
  //       return customer["customerStatus"][filterFieldsKeyMap[field]];
  //     }
  //     return true;
  //   });
  // };

  // let filteredCustomers =
  //   searchFilter.length == 0
  //     ? customers
  //     : customers?.filter((customer) => filterCustomers(customer));

  const filteredCustomers = customers?.filter(
    (customer) =>
      includesCaseInsensitive(customer?.basicInfo?.firstName, inputVal) ||
      includesCaseInsensitive(customer?.basicInfo?.lastName, inputVal)
  );

  return (
    <div className="flex flex-col gap-y-6  mb-32 items-center justify-between  relative w-full">
      <PageHeader title="Explore Profiles"
        inputVal={inputVal}
        onInputVal={setInputVal}
        inputRef={inputRef}
        customersLength={filteredCustomers.length} />

      <LoadingSpinner isLoading={loading} />
      {filteredCustomers.length == 0 && !loading ? (
        <p className="text-center mt-6">{"No profiles to display"}</p>
      ) : (
        <div className="flex flex-col gap-y-6 w-full xl:w-10/12 px-4 md:px-8 ">
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
      ) : loadMoreMsg != "" ? (
        <div className="text-center ">
          {loadMoreMsg || "No more matches found."}
        </div>
      ) : (!loading &&
        <button
          type="button"
          className="mx-auto mt-4 border text-white  px-4 md:px-5 py-2 md:py-3 bg-fr-blue-100 rounded-xl hover:opacity-90"
          onClick={handleFetchMoreCustomers}
        >
          View More ...
        </button>
      )}
    </div>
  );
}

export default SearchProfiles;
