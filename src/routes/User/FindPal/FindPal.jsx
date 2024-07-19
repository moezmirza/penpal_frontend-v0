import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MultiSelectField } from "../../../components/mainComponents/MultiSelectField";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import {
  ageGrpList,
  educationList,
  genderList,
  orientationList,
  raceList,
  stateList,
} from "./findPalState";

import { get } from "../../../api/get";

function FindPal() {
  const user = useSelector((state) => state.user.currentUser);
  const [customers, setCustomers] = useState([]);
  const [collapseDropdown, setCollapseDropdown] = useState(false);
  const [matchesAlert, setMatchesAlert] = useState("");
  const authToken = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  console.log("authToken", authToken);
  const itemsPerPage = 5;

  const customSelectContainerRef = useRef(null);
  const searchSectRef = useRef(null);
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    state: [],
    age: [],
    gender: [],
    orientation: [],
    race: [],
    education: [],
    isApplied: false,
  });
  const filterStateNameMap = {
    State: "state",
    Age: "age",
    Gender: "gender",
    Orientation: "orientation",
    Race: "race",
    Education: "education",
  };

  const filterOptionsMap = {
    State: stateList,
    Age: ageGrpList,
    Gender: genderList,
    Orientation: orientationList,
    Race: raceList,
    Education: educationList,
  };
  console.log(filterOptionsMap["State"][0]);
  const oneChoiceField = ["age", "gender", "race", "education"];

  const handleBtnClick = () => {
    if (user.profileComplete) {
      if (searchSectRef.current) {
        searchSectRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate("/user-profile");
    }
  };
  console.log("it rendered");
  const handleFilterChange = (key, value, remove) => {
    console.log("filter changed occcured");
    const stateKey = key.toLowerCase();
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

  const handleClickOutside = (e) => {
    console.log(customSelectContainerRef.current.contains(e.target));

    if (
      customSelectContainerRef.current &&
      !customSelectContainerRef.current.contains(e.target)
    ) {
      setCollapseDropdown(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (collapseDropdown) {
      setCollapseDropdown(false);
    }
  }, [collapseDropdown]);

  useEffect(() => {
    console.log("this gets caled");
    const fetchCustomers = async () => {
      setLoading(true);
      const { success, data, error } = await get(
        `/user/matches?p=0&l=${itemsPerPage}`,
        authToken
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
  }, [authToken]);

  const handleFetchMoreCustomers = () => {
    if (user.profileComplete) {
      //  page start from zero
      const page =
        customers.length === itemsPerPage
          ? 1
          : Math.floor(customers.length / itemsPerPage) + 1;
      const fetchMoreCustomers = async () => {
        setIsLoadingMore(true);
        const { success, data, error } = await get(
          `/user/matches?p=${page}&l=${itemsPerPage}`,
          authToken
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
    } else {
      navigate("/user-profile");
    }
    console.log("more");
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

  const filterCustomers = () => {
    console.log("filter", filter);
    return customers.filter((customer) => {
      const ageGroup = getAgeGroup(customer.age);
      return (
        (!filter?.state.length || filter.state.includes(customer.state)) &&
        (!filter?.age.length || filter.age.includes(ageGroup)) &&
        (!filter?.gender.length || filter.gender.includes(customer.gender)) &&
        (!filter?.orientation.length ||
          filter.orientation.includes(customer.orientation)) &&
        (!filter?.race.length || filter.race.includes(customer.race)) &&
        (!filter?.education.length ||
          filter.education.includes(customer.education))
      );
    });
  };

  const filteredCustomers = useMemo(
    () => filterCustomers(),
    [customers, filter]
  );
  console.log("filetredCustomers", filteredCustomers);

  return (
    <div className="bg-c-basic flex flex-col gap-y-12 ">
      <div className="flex justify-between bg-fr-blue-200 p-3 mt-16 w-10/12 m-auto rounded">
        <div className="text-white my-auto ml-6 flex flex-col gap-y-8">
          <h2 className="text-7xl font-bold">
            CONNECT <br /> BEYOND BARS
          </h2>
          <div className="text-xl ">
            Discover friendship, support, and a new perspective with
            <p className="font-semibold ">A Way Out PenPals</p>
          </div>
          <div className="flex items-center gap-x-4 ">
            <button
              className=" flex items-center gap-x-4 text-xl w-fit  text-[#47C3F6]  rounded-md hover:opacity-90"
              onClick={handleBtnClick}
            >
              Get Started
              <img
                src="/assets/icons/circularArrow.svg"
                className="h-6"
                alt=""
              />
            </button>
            {/* Complete profile to find best matches. */}
          </div>
        </div>
        <img src="/assets/heroImage.png" alt="" />
      </div>
      <div
        ref={searchSectRef}
        style={{ marginTop: "-50px", height: "50px", visibility: "hidden" }}
      ></div>

      <div
        id="sect-search"
        className="flex flex-col gap-y-12 bg-white p-6 relative"
      >
        <div className="text-4xl font-bold">Find your best pal.</div>
        {loading && <LoadingSpinner />}
        <div
          id="filters"
          className="grid grid-cols-3 gap-6"
          ref={customSelectContainerRef}
        >
          {Object.keys(filterOptionsMap).map((key) => (
            <MultiSelectField
              key={key}
              labelText={key}
              placeholderText={filterOptionsMap[key][0]}
              dropdownOptions={filterOptionsMap[key]}
              selectedOptions={filter[filterStateNameMap[key]]}
              onChange={handleFilterChange}
              collapseDropdown={collapseDropdown}
            />
          ))}
        </div>

        <div id="customers" className="flex flex-col gap-y-6">
          {filteredCustomers.map((customer, index) => (
            <CustomerCard key={index} customer={customer} />
          ))}
        </div>
        {isLoadingMore ? (
          <p className="text-center">Loading...</p>
        ) : matchesAlert || filter.isApplied ? (
          <div className="text-center ">
            {matchesAlert || "No more matches found."}
          </div>
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
    </div>
  );
}

function CustomerCard({ customer }) {
  const navigate = useNavigate();
  return (
    <div
      id="customer-card"
      className=" rounded-md border border-gray-300 p-4 w-9/12 flex gap-x-4"
    >
      <img
        src={customer?.profilePic || "/assets/default.jpg"}
        alt=""
        className="h-44 w-44 rounded"
      />
      <div className="flex flex-col gap-y-3 w-7/12">
        <div className="">
          <p className="font-semibold text-3xl mb-1">
            {customer.firstName} {customer.lastName}
          </p>

          <div className="flex gap-x-4">
            <p>{customer?.age || "N/A"} yrs</p>
            <p>{customer?.gender || "N/A"}</p>
            <p>{customer?.orientation || "N/A"}</p>
            <p>{customer?.race || "N/A"}</p>
            <span className="flex gap-x-1 items-baseline">
              <img src="/assets/icons/star.svg" alt="" className="h-4" />{" "}
              {customer?.rating || 0}
            </span>
            <p className="underline">{customer?.numRatings || 0} Reviews</p>
          </div>
        </div>
        <p>
          <span className="font-medium mr-1">Location:</span>
          {customer.state || "N/A"}, {customer.city || "N/A"}
        </p>
        <p>
          <span className="font-medium mr-1">Education:</span>
          {customer.education || "N/A"}
        </p>
        <p>
          <span className="font-medium mr-1"> Mainling Addres:</span>
          {customer.mailingAddress || "N/A"}
        </p>
      </div>
      <div className="ml-auto flex flex-col my-auto">
        <button
          type="button"
          className=" ml-auto mt-4 bg-fr-blue-200 text-white px-6 py-3 rounded hover:opacity-90"
          onClick={() => navigate(`/customer/${customer._id}`)}
        >
          View Details
        </button>
        <button
          type="button"
          className=" ml-auto mt-4 border text-black px-5 py-3 border-fr-blue-200 rounded hover:opacity-90"
          onClick={() => navigate("/chat", { state: { data: customer } })}
        >
          Message Pal
        </button>
      </div>
    </div>
  );
}

export default FindPal;
