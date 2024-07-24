import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { MultiSelectField } from "../../../components/mainComponents/MultiSelectField";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { useGet } from "../../../api/useGet";
import CompleteProfilePopup from "../../../components/CompleteProfilePopup";
import {
  ageGrpList,
  educationList,
  genderList,
  orientationList,
  raceList,
  stateList,
} from "../../../utils/sharedState";

export const mailTOLink = (email) => {
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
  const [viewMorePopup, setViewMorePopup] = useState(false);
  const get = useGet();

  const itemsPerPage = 5;
  const searchSectRef = useRef(null);
  const location = useLocation();

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
    if (user?.profileComplete) {
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
    } else {
      setViewMorePopup(true);
    }
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
  };

  useEffect(() => {
    if (location.hash === "#findpal" && searchSectRef.current) {
      searchSectRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location]);

  return (
    <div className="bg-c-basic flex flex-col gap-y-12 w-full px-3 py-6">
      <div
        id="hero-section"
        className="flex flex-col-reverse lg:flex-row gap-y-6 justify-between bg-fr-blue-200 p-3 mt-2 md:mt-12 w-full md:w-10/12 m-auto rounded relative"
      >
        {getStartedPopup && (
          <CompleteProfilePopup onCloseClick={setGetStartedPopup} />
        )}
        <div className="text-white my-auto ml-0 md:ml-6 flex flex-col gap-y-8">
          <h2 className="hidden md:block text-2xl md:text-7xl font-bold">
            CONNECT <br /> BEYOND BARS
          </h2>
          <h2 className="text-2xl md:text-7xl md:hidden font-bold">
            CONNECT BEYOND BARS
          </h2>
          <div className="text-lg md:text-xl ">
            Discover friendship, support, and a new perspective with
            <p className="font-semibold ">A Way Out PenPals</p>
          </div>
          <div className="flex items-center gap-x-4 ">
            <button
              className=" flex items-center gap-x-4 text-xl hover:underline md:text-2xl w-fit  text-[#47C3F6]  rounded-md hover:opacity-90"
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
      <div
        ref={searchSectRef}
        id="findpal"
        className="flex flex-col  gap-y-12 bg-white p-3 md:p-6 relative"
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
        {loading && <LoadingSpinner />}

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

        <div id="customers" className="flex flex-col gap-y-6 relative">
          {filteredCustomers.map((customer, index) => (
            <CustomerCard key={index} customer={customer} />
          ))}
          {viewMorePopup && (
            <CompleteProfilePopup
              atEnd={true}
              onCloseClick={setViewMorePopup}
            />
          )}
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

function CustomerCard({ customer, name }) {
  const navigate = useNavigate();
  return (
    <div
      id="customer-card"
      className={`bg-gray-100 border ${
        customer?.isFavorite && "border-green-500"
      }  rounded-md border border-gray-300 p-4 w-full md:w-9/12 flex flex-col gap-y-6 gap-x-4 md:flex-row`}
    >
      <img
        src={customer?.imageUrl || "/assets/default.jpg"}
        alt=""
        className="h-80 md:w-44 md:h-44 rounded"
      />
      <div className="flex flex-col gap-y-3 md:w-7/12 w-full ">
        <div className=" ">
          <div className="flex gap-x-6 items-baseline">
            <p className="font-semibold md:text-3xl text-lg mb-4 md:mb-1">
              {customer?.firstName} {customer?.lastName}
            </p>
            <img
              src={`assets/icons/${customer?.isFavorite && "filledHeart.svg"}`}
              alt=""
              className="h-6"
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <p className="hidden md:block text-nowrap">
              {customer?.age || "N/A"} yrs
            </p>
            <p className="hidden md:block text-nowrap">
              {customer?.gender || "N/A"}
            </p>
            <p className="hidden md:block text-nowrap">
              {customer?.orientation || "N/A"}
            </p>
            <p className="hidden md:block text-nowrap">
              {customer?.race || "N/A"}
            </p>
            <span className="flex gap-x-1 items-baseline">
              <img
                src="/assets/icons/star.svg"
                alt=""
                className="h-4  text-nowrap"
              />{" "}
              {customer?.rating || 0}
            </span>
            <p className="underline  text-nowrap">
              {customer?.numRatings || 0} Reviews
            </p>
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
          <span className="font-medium mr-1"> Mailing Address:</span>
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
        <button
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
        </button>
      </div>
    </div>
  );
}

export default FindPal;
