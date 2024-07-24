import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { usePut } from "../../api/usePut";
import { usePost } from "../../api/usePost";
import { useSelector } from "react-redux";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import {
  basicInfoFieldLabelMap,
  spokenLanguagesList,
} from "../../utils/sharedState";
import { mailTOLink } from "../User/FindPal/FindPal";

function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [msgText, setMsgText] = useState("");
  const get = useGet();
  const post = usePost();
  const put = usePut();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      const { success, data, error } = await get(`/customer?id=${id}`);
      if (success) {
        console.log("customer data", data);
        setCustomer(data);
        setLoading(false);
      } else {
        setLoading(false);
        setError("");
        console.log("error here", error);
      }
    };
    fetchCustomer();
  }, []);

  const handleRatingUpdate = async (rating) => {
    const { success, data, error } = await put(`/customer/rate?id=${id}`, {
      rating,
    });
    if (success) {
      console.log("rating data", data);
    } else {
      console.log("error updating rating", error);
    }
  };

  const handleFavouriteUpdate = async (e) => {
    const target =
      e.target.tagName === "IMG" ? e.target.parentElement : e.target;
    const buttonText = target.innerText; // or target.textContent
    console.log(buttonText);
    const newText =
      buttonText.trim() === "Add to Favorites" ? "Favorite" : "Add to Favorites";

    target.innerHTML = `<img src="/assets/icons/bookmark.svg" alt="" class="h-6 mr-2" /> ${newText}`;
    const { success, data, error } = await put(`/user/favorite?id=${id}`, {
      fav: buttonText === "Favorite" ? false : true,
    });
    if (success) {
      console.log("Favorite data", data);
    } else {
      console.log("error updating rating", error);
    }
  };
  const handleMsgSend = async (e) => {
    e.target.disabled = true;
    e.target.innerText = "Sending...";
    if (msgText != "") {
      const { success, data, error } = await post(`/user/chat?id=${id}`, {
        messageText: msgText,
      });
      if (success) {
        e.target.innerText = "Sent";
      }
    }
  };

  const basicInfoDisplayFields = [
    "inmateNumber",
    "mailingAddress",
    "zipcode",
    "dateOfBirth",
    "height",
    "weight",
    "hairColor",
    "eyeColor",
    "spokenLanguages",
    "institutionalEmailProvider",
    "referredBy",
    "religiousPref",
    "education",
    "nameOfCollege",
    "bodyType",
    "astrologicalSign",
    "relationShipStatus",
    "veteranStatus",
  ];
  const isAdmin = JSON.parse(localStorage.getItem("adminAuth"));

  const handleApprovalUpdate = async (e, status, cid) => {
    e.target.innerText = "Approved";
    e.target.disabled = true;

    put(`/admin/approve-customer?id=${cid}`).then((response) => {
      const { success, data, error } = response;
      if (success) {
        console.log("Approval update successful:", data);
      } else {
        console.error("Error approving customer:", error);
      }
    });

    setCustomer({ ...customer, profileApproved: true });
  };
  return (
    <div className="bg-c-basic min-h-screen p-3 md:p-6 py-12 flex justify-center gap-y-12 gap-x-4 pb-32">
      <div
        id="profile-details"
        className={`bg-white w-full md:w-9/12  border ${
          customer?.profileApproved == false && "border-red-500"
        }  rounded-lg flex flex-col gap-y-4 p-6`}
      >
        {customer?.profileApproved == false && (
          <p className="text-red-500 text-center text-xl">
            Profile Pending for approval
          </p>
        )}
        {loading && <LoadingSpinner />}
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col md:flex-row md:items-start gap-x-12 relative">
            <img
              src={customer?.imageUrl || "/assets/default.jpg"}
              alt=""
              className="w-full h-auto md:h-44 md:w-44 rounded"
            />
            <div className="flex flex-col justify-center gap-1 md:w-7/12 w-full mb-6 md:mb-0">
              <div>
                <p className="font-semibold text-3xl mb-2 md:mb-1 text-center md:text-left">
                  {customer?.firstName} {customer?.lastName}
                </p>

                <div className="flex gap-3 justify-center md:justify-start flex-wrap ">
                  <p className="text-nowrap">{customer?.age || "N/A"} yrs</p>
                  <p className="text-nowrap">{customer?.gender || "N/A"}</p>
                  <p className="text-nowrap">
                    {customer?.orientation || "N/A"}
                  </p>
                  <p className="text-nowrap">{customer?.race || "N/A"}</p>
                  <span className="flex gap-x-1 items-baseline">
                    <img src="/assets/icons/star.svg" alt="" className="h-4" />{" "}
                    {customer?.rating || 0}
                  </span>
                  <p className="underline text-nowrap">
                    {customer?.numRatings || 0} Reviews
                  </p>
                </div>
              </div>
              <p>
                {customer?.bio || (
                  <p className="italic mt-6 text-gray-500 text-center md:text-left">
                    No bio added
                  </p>
                )}
              </p>
            </div>
            <div className="flex flex-col items-center ">
              {isAdmin ? (
                <button
                  type="button"
                  className="flex items-center justify-center h-fit w-fit mx-auto border text-white text px-8 py-3 bg-green-600 rounded-xl hover:opacity-90 text-nowrap"
                  onClick={(e) => handleApprovalUpdate(e, true, customer._id)}
                >
                  Approve
                </button>
              ) : (
                <button
                  type="button"
                  className="flex items-center justify-center h-fit mx-auto  w-fit border text-white px-5 py-3 bg-fr-blue-200 rounded-xl hover:opacity-90 text-nowrap"
                  onClick={handleFavouriteUpdate}
                >
                  <img
                    src="/assets/icons/bookmark.svg"
                    alt=""
                    className="h-6 mr-2"
                  />
                  {customer?.isFavorite ? "Favorite" : "Add to Favorites"}
                </button>
              )}
              <button
                type="button"
                className="mt-4 border text-black px-5 py-3 text-nowrap w-fit border-fr-blue-200 rounded-xl hover:opacity-90"
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

          <div>
            <h2 className="font-semibold text-3xl md:text-2xl my-4 underline">
              Basic Info
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              {customer &&
                basicInfoDisplayFields.map((field) => {
                  return (
                    customer[field] &&
                    (field == "spokenLanguages" ? (
                      <p className="flex flex-wrap items-end">
                        <span className="font-semibold mr-1 text-lg">
                          {basicInfoFieldLabelMap[field]}:
                        </span>
                        {customer[field].map((lang) => (
                          <span className="mr-1">{lang}</span>
                        ))}
                      </p>
                    ) : (
                      <p className="">
                        <span className="font-semibold mr-1 text-lg">
                          {basicInfoFieldLabelMap[field]}:
                        </span>
                        {field == "dateOfBirth"
                          ? customer[field].split("T")[0]
                          : customer[field]}
                      </p>
                    ))
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-y-10">
            <div>
              <h2 className="font-semibold text-3xl md:text-2xl my-4 underline">
                Personality Info
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {Object.keys(customer?.personality || []).map(
                  (key) =>
                    key != "_id" && (
                      <div key={key}>
                        <p className="font-semibold text-lg ">
                          {key.toUpperCase()}
                        </p>
                        <ul className="">
                          {customer?.personality[key].map((value) => (
                            <li className="text-nowrap" key={value}>
                              {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                )}
              </div>
            </div>
            {!isAdmin && (
              <div className="">
                <h1 className="text-3xl md:text-2xl font-semibold underline mb-4 ">
                  Give your rating
                </h1>
                <div className="flex items-center gap-x-4">
                  <RatingScale
                    initialRating={customer?.prevRating}
                    onRatingChange={handleRatingUpdate}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div
        id="send-msgs"
        className="bg-white px-4 py-6 rounded-lg h-fit flex  flex-col grow gap-y-8"
      >
        <p className="font-bold text-2xl text-center">
          Send {customer?.firstName} a message
        </p>
        <textarea
          name=""
          id=""
          className="outline-none border focus:border-fr-blue-200 rounded p-3"
          rows={6}
          value={msgText}
          onChange={(e) => setMsgText(e.target.value)}
        ></textarea>
        <button
          type="button"
          className="mx-auto mt-4 border w-full text-white text px-5 py-3 bg-fr-blue-200 rounded-xl hover:opacity-90"
          onClick={handleMsgSend}
        >
          Send Message
        </button>
      </div> */}
    </div>
  );
}

const RatingScale = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(null);
  const handleMouseEnter = (value) => setHoverRating(value);
  const handleMouseLeave = () => setHoverRating(null);
  const handleClick = (value) => {
    setRating(value);
    onRatingChange(value);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          filled={value <= (hoverRating || rating || initialRating)}
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <svg
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`w-6 h-6 cursor-pointer ${
        filled ? "text-yellow-500" : "text-gray-300"
      } transition-colors duration-150 ease-in-out`}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.09-.78L12 2 11.09 8.46 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
};
export default Customer;
