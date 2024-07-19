import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../api/get";
import { put } from "../../api/put";
import { post } from "../../api/post";
import { useSelector } from "react-redux";
import { LoadingSpinner } from "../../components/LoadingSpinner";

function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [msgText, setMsgText] = useState("");
  console.log("customer", customer);
  // const [ratingVal, setRatingVal] = useState("");
  const authToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      const { success, data, error } = await get(
        `/customer/test?id=${id}`,
        authToken
      );
      if (success) {
        console.log("customer data", data);
        setCustomer(data[0]);
        setMsgText(
          `Hi ${data[0].firstName}, I'm looking for a penpal. I'd like to find out more about how you work. I'm looking forward to your reply!`
        );
        setLoading(false);
      } else {
        setLoading(false);
        setError("");
        console.log("error here", error);
      }
    };
    fetchCustomer();
  }, [authToken]);

  const handleRatingUpdate = async (rating) => {
    const { success, data, error } = await put(
      `/customer/rate?id=${id}`,
      { rating },
      authToken
    );
    if (success) {
      console.log("rating data", data);
    } else {
      console.log("error updating rating", error);
    }
  };

  const handleFavouriteUpdate = async (e) => {
    // console.log(e.tagert.textContent, e.target.textContent);
    const target =
      e.target.tagName === "IMG" ? e.target.parentElement : e.target;
    const buttonText = target.innerText; // or target.textContent
    console.log(buttonText);
    const newText =
      buttonText.trim() === "Add to Favorites" ? "Added" : "Add to Favorites";

    target.innerHTML = `<img src="/assets/icons/bookmark.svg" alt="" class="h-6 mr-2" /> ${newText}`;
    const { success, data, error } = await put(
      `/user/favorite?id=${id}`,
      {
        fav: buttonText === "Added" ? false : true,
      },
      authToken
    );
    if (success) {
      console.log("Favorite data", data);
    } else {
      console.log("error updating rating", error);
    }
  };
  const handleMsgSend = async (e) => {
    e.target.disabled = true;
    e.target.innerText = "Sending...";
    console.log("msg text", msgText);
    if (msgText != "") {
      const { success, data, error } = await post(
        `/user/chat?id=${id}`,
        {
          messageText: msgText,
        },
        authToken
      );
      if (success) {
        console.log("msg send data", data);
        e.target.innerText = "Sent";
      }
    }
  };
  return (
    <div className="bg-c-basic min-h-screen p-6 py-12 flex gap-x-4 pb-32">
      <div
        id="profile-details"
        className=" bg-white w-8/12 rounded-lg  flex flex-col gap-y-12 p-6"
      >
        <div className={`top-1/2 left-1/3 relative`}>
          {loading && <LoadingSpinner />}
        </div>
        <div className="flex gap-x-4 justify-between relative">
          <img
            src={customer?.profilePic || "/assets/default.jpg"}
            alt=""
            className="h-44 w-44 rounded"
          />
          <div className="flex flex-col gap-y-3 w-7/12">
            <div className="">
              <p className="font-semibold text-3xl mb-1">
                {customer?.firstName} {customer?.lastName}
              </p>

              <div className="flex gap-x-3">
                <p className="text-nowrap">{customer?.age || "N/A"} yrs</p>
                <p className="text-nowrap">{customer?.gender || "N/A"}</p>
                <p className="text-nowrap">{customer?.orientation || "N/A"}</p>
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
          <button
            type="button"
            className="flex items-center h-fit  border text-white text px-5 py-3 bg-fr-blue-200 rounded-xl hover:opacity-90 text-nowrap my-auto"
            onClick={handleFavouriteUpdate}
          >
            <img src="/assets/icons/bookmark.svg" alt="" className="h-6 mr-2" />
            {customer?.isFavorite ? "Added" : "Add to Favorites"}
          </button>
        </div>
        <div className="flex flex-col gap-y-10">
          <div>
            <h2 className="font-semibold text-2xl my-4 underline">
              Personality Details
            </h2>

            <div className="grid grid-cols-4 gap-8">
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

          <div className="">
            <h1 className="text-2xl font-semibold underline mb-4 ">
              Give your rating
            </h1>
            <div className="flex items-center gap-x-4">
              <RatingScale
                initialRating={customer?.prevRating}
                onRatingChange={handleRatingUpdate}
              />
              {/* <p className="mt-2"> {ratingVal}</p> */}
            </div>
          </div>
        </div>
      </div>
      <div
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
      </div>
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
