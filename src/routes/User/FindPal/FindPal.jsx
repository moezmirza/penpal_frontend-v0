import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { MultiSelectField } from "../../../components/mainComponents/MultiSelectField";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { useGet } from "../../../api/useGet";
import ConfirmPopup from "../../../components/ConfrimPopup";
import {
  ageGrpList,
  educationList,
  genderList,
  orientationList,
  otherFiltersKeyMap,
  othersFilterList,
  raceList,
  stateList,
} from "../../../utils/sharedState";
import { includesCaseInsensitive } from "../../Admin/ApproveUpdates";
import CustomerCard from "../../../components/CustomerCard";

export const mailTOLink = (email, name) => {
  const intialBody = `Hi ${name}, I'm looking for a penpal. I'd like to find out more about how you work. I'm looking forward to your reply!`;

  return `mailto:${email}?subject=${encodeURIComponent(
    "Looking for a pal"
  )}&body=${encodeURIComponent(intialBody)}`;
};
function FindPal() {
  const user = useSelector((state) => state.user.currentUser);
  const [customers, setCustomers] = useState([]);
  const [matchesAlert, setMatchesAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [getStartedPopup, setGetStartedPopup] = useState(false);
  // const [viewMorePopup, setViewMorePopup] = useState(false);
  const navigate = useNavigate();
  const get = useGet();

  const itemsPerPage = 30;
  const searchSectRef = useRef(null);
  const location = useLocation();
  const [inputVal, setInputVal] = useState("");

  const [filter, setFilter] = useState({
    state: [],
    age: [],
    gender: [],
    orientation: [],
    // race: [],
    education: [],
    isApplied: false,
    others: [],
  });
  const filterStateNameMap = {
    State: "state",
    Age: "age",
    Gender: "gender",
    Orientation: "orientation",
    Race: "race",
    Education: "education",
    "Other Options": "others",
  };

  const filterOptionsMap = {
    State: stateList,
    Age: ageGrpList,
    Gender: genderList,
    Orientation: orientationList,
    // Race: raceList,
    Education: educationList,
    "Other Options": othersFilterList,
  };
  const oneChoiceField = ["age", "gender", "race", "education"];

  const handleGetStartedClick = () => {
    if (user?.profileComplete) {
      if (searchSectRef.current) {
        searchSectRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      setGetStartedPopup(true);
    }
  };
  const handleFilterChange = (key, value, remove) => {
    console.log("filter changed occcured", key);
    let stateKey = key.toLowerCase();
    if (key == "Other Options") {
      stateKey = "others"
    }
    console.log("key", stateKey, key);
    let updatedArr = filter[stateKey];
    console.log("updatedArr", updatedArr);
    if (remove) {
      updatedArr = updatedArr.filter((item) => item != value);
    } else {
      console.log("UpdatedArr", updatedArr, "value", value);
      if (oneChoiceField.includes(stateKey)) {
        updatedArr = [value];
      }
      updatedArr = [...updatedArr, value];
    }
    const updatedFilter = {
      ...filter,
      [stateKey]: updatedArr,
    };
    const checkIfApplied = Object.values(updatedFilter).some(
      (value) => value.length > 0
    );
    updatedFilter.isApplied = checkIfApplied; // to check whether filter is applied or not
    setFilter(updatedFilter);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { success, data, error } = await get(
        `/user/matches?p=0&l=${itemsPerPage}`
      );
      console.log(data);
      if (success) {
        setLoading(false);
        setCustomers(data);
      } else {
        setLoading(false);
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
        `/user/matches?p=${page}&l=${itemsPerPage}`
      );
      if (success) {
        setIsLoadingMore(false);
        if (data.length == 0) {
          setMatchesAlert("No more matches found.");
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

  function getAgeGroup(age) {
    for (let group of ageGrpList) {
      const [min, max] = group.split("-").map(Number);
      if (age >= min && age <= max) {
        return group;
      }
    }
    return null;
  }

  const checkCustomerStatus = (customer, options) => {
    return options.some(
      (field) => customer?.customerStatus[otherFiltersKeyMap[field]]
    );
  };

  const filterCustomers = () => {
    return customers.filter((customer) => {
      const ageGroup = getAgeGroup(customer?.basicInfo?.age);
      return (
        (!filter?.state.length ||
          filter.state.includes(customer?.basicInfo?.state)) &&
        (!filter?.age.length || filter.age.includes(ageGroup)) &&
        (!filter?.gender.length ||
          filter.gender.includes(customer?.basicInfo?.gender)) &&
        (!filter?.orientation.length ||
          filter.orientation.includes(customer?.basicInfo?.orientation)) &&
        (!filter?.others.length ||
          checkCustomerStatus(customer, filter?.others)) &&
        // (!filter?.race.length ||
        //   filter.race.includes(customer?.basicInfo?.race)) &&
        (!filter?.education.length ||
          filter.education.includes(customer?.basicInfo?.education))
      );
    });
  };

  let filteredCustomers = useMemo(() => filterCustomers(), [customers, filter]);

  const handleClearFilters = () => {
    let newObj = {};
    Object.keys(filter).forEach((key) => {
      if (key == "isApplied") {
        newObj[key] = false;
      } else {
        newObj[key] = [];
      }
      setFilter(newObj);
    });
    setInputVal("");
  };

  useEffect(() => {
    if (location.hash === "#findpal" && searchSectRef.current) {
      searchSectRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  filteredCustomers = filteredCustomers?.filter(
    (customer) =>
      includesCaseInsensitive(customer?.basicInfo?.firstName, inputVal) ||
      includesCaseInsensitive(customer?.basicInfo?.lastName, inputVal)
  );
  return (
    <div className="flex flex-col gap-y-12 w-full md:py-0 mb-16">
      <div className="bg-b-gradient-3 p-3 md:pt-32 md:p-28">
        <div
          id="hero-section"
          className="flex flex-col-reverse gap-y-6 lg:flex-row md:justify-between bg-fr-blue-200 p-3 md:p-6 border rounded-lg "
        >
          {getStartedPopup && (
            <ConfirmPopup
              onCloseClick={setGetStartedPopup}
              onConfirm={() => navigate("/user-profile")}
              confirmBtnTxt={"Complete profile"}
              infoText={"Complete your profile to find your matches"}
            />
          )}
          <div className="text-white my-auto ml-0 md:ml-6 flex flex-col gap-y-8">
            <h2 className="hidden lg:block text-2xl lg:text-7xl font-bold">
              CONNECT <br /> BEYOND BARS
            </h2>
            <h2 className="text-2xl lg:text-7xl lg:hidden font-bold">
              CONNECT BEYOND BARS
            </h2>
            <div className="text-lg lg:text-xl ">
              Discover friendship, support, and a new perspective with
              <p className="font-semibold ">A Way Out PenPals</p>
            </div>
            <div className="flex items-center gap-x-4 ">
              <button
                className=" flex items-center gap-x-4 text-xl hover:underline lg:text-2xl w-fit  text-[#47C3F6]  rounded-md hover:opacity-90"
                onClick={handleGetStartedClick}
              >
                Get Started
                <img
                  src="/assets/icons/circularArrow.svg"
                  className="h-6"
                  alt=""
                />
              </button>
            </div>
          </div>
          <img src="/assets/heroImage.png" alt="" className="h-80 lg:h-auto" />
        </div>
      </div>

        <hr className="border border-gray-300 w-9/12 mx-auto" />

      <div
        ref={searchSectRef}
        id="findpal"
        className="flex flex-col gap-y-8 bg-white px-4 md:p-6 relative"
      >
        <div className="flex flex-col items-start gap-y-3 md:justify-between md:flex-row">
          <p className="text-2xl md:text-4xl font-bold">Find your best pal.</p>
          <button
            className=" border text-white px-5 py-1 md:py-2 bg-fr-blue-200 rounded-md hover:opacity-90"
            onClick={handleClearFilters}
          >
            Clear filters
          </button>
        </div>
        <LoadingSpinner position="absolute" isLoading={loading} />
        <div className="flex flex-col gap-y-4">
          <div id="filters" className="grid  md:grid-cols-3 gap-6">
            {Object.keys(filterOptionsMap).map((key) => (
              <MultiSelectField
                key={key}
                labelText={key}
                placeholderText={filterOptionsMap[key][0]}
                dropdownOptions={filterOptionsMap[key]}
                selectedOptions={filter[filterStateNameMap[key]]}
                onChange={handleFilterChange}
              />
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-y-4 justify-between md:items-end">
            <label className="md:w-9/12 w-full text-sm md:text-base">
              Search
              <input
                type="text"
                name="firstName"
                placeholder="Search customer name here..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full bg-transparent block mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 "
              />
            </label>
            {/* <p className="font-semibold md:text-2xl">
              Total : {filteredCustomers.length}
            </p> */}
          </div>
        </div>

        {filteredCustomers.length == 0 && !loading ? (
          <p className="text-center text-sm md:text-base">
            No profiles to display
          </p>
        ) : (
          <div
            id="customers"
            className="flex flex-col gap-y-6 relative w-full xl:w-10/12 "
          >
            {filteredCustomers.map((customer, index) => (
              <CustomerCard
                key={index}
                customer={customer}
                onViewDetails={() => navigate(`/inmate/${customer._id}`)}
              />
            ))}
          </div>
        )}
        {isLoadingMore ? (
          <p className="text-center">Loading...</p>
        ) : matchesAlert != "" ? (
          <div className="text-center ">
            {matchesAlert || "No more matches found."}
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
    </div>
  );
}

export default FindPal;
