import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { usePut } from "../../api/usePut";
import { usePost } from "../../api/usePost";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { basicInfoFieldLabelMap } from "../../utils/sharedState";

function AdminCustomer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const get = useGet();
  const post = usePost();
  const put = usePut();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      const { success, data, error } = await get(
        `/admin/update?approved=${false}&id=${id}`
      );
      if (success) {
        console.log("customer data", data[0]);
        setCustomer(data[0]);

        setLoading(false);
      } else {
        setLoading(false);
        setError("");
        console.log("error here", error);
      }
    };
    fetchCustomer();
  }, []);

  const handleApprovalUpdate = async (e, status, cid) => {
    e.target.innerText = "Approved";
    e.target.disabled = true;

    put(`/admin/approve-update?id=${cid}`).then((response) => {
      const { success, data, error } = response;
      if (success) {
        console.log("Approval update successful:", data);
      } else {
        console.error("Error approving customer:", error);
      }
    });
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

  const updatedFields = customer?.updatedFields || [];
  return (
    <div className="bg-c-basic min-h-screen p-3 md:p-6 py-12 flex justify-center gap-y-12 gap-x-4 pb-32">
      <div
        id="profile-details"
        className={`bg-white w-full md:w-9/12  border rounded-lg flex flex-col gap-y-4 p-6`}
      >
        {loading && <LoadingSpinner />}
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col md:flex-row md:items-start gap-x-12 relative">
            <img
              src={customer?.profilePic || "/assets/default.jpg"}
              alt=""
              className="w-full h-auto md:h-44 md:w-44 rounded"
            />
            <div className="flex flex-col justify-center gap-1 md:w-7/12 w-full mb-6 md:mb-0">
              <div>
                <p className="font-semibold text-3xl mb-2 md:mb-1 text-center md:text-left">
                  {customer?.firstName} {customer?.lastName}{" "}
                  {(updatedFields?.includes("firstName") ||
                    updatedFields?.includes("lastName")) && (
                    <span className="font-normal text-xs text-green-500 ml-2">
                      new
                    </span>
                  )}
                </p>

                <div className="flex gap-3 justify-center md:justify-start flex-wrap ">
                  <p className="text-nowrap">
                    {customer?.age || "N/A"} yrs{" "}
                    {updatedFields?.includes("age") && (
                      <span className="font-normal text-xs text-green-500 ml-2">
                        new
                      </span>
                    )}
                  </p>
                  <p className="text-nowrap">
                    {customer?.gender || "N/A"}
                    {updatedFields?.includes("gender") && (
                      <span className="font-normal text-xs text-green-500 ml-2">
                        new
                      </span>
                    )}
                  </p>
                  <p className="text-nowrap">
                    {customer?.orientation || "N/A"}
                    {updatedFields?.includes("orientation") && (
                      <span className="font-normal text-xs text-green-500 ml-2">
                        new
                      </span>
                    )}
                  </p>
                  <p className="text-nowrap">
                    {customer?.race || "N/A"}
                    {updatedFields?.includes("race") && (
                      <span className="font-normal text-xs text-green-500 ml-2">
                        new
                      </span>
                    )}
                  </p>
                  <span className="flex gap-x-1 items-baseline">
                    <img src="/assets/icons/star.svg" alt="" className="h-4" />{" "}
                    {customer?.rating || 0}
                  </span>
                  <p className="underline text-nowrap">
                    {customer?.numRatings || 0} Reviews
                  </p>
                </div>
              </div>

              <p className="flex flex-col items-start mt-6 ">
                {updatedFields?.includes("bio") && (
                  <span className="font-normal text-xs text-green-500">
                    new
                  </span>
                )}
                {customer?.bio || (
                  <p className="italic text-gray-500">No bio added</p>
                )}
              </p>
            </div>
            <button
              type="button"
              className="flex items-center justify-center h-fit  border text-white text px-5 py-3 bg-green-600 rounded-xl hover:opacity-90 text-nowrap"
              onClick={(e) => handleApprovalUpdate(e, true, customer._id)}
            >
              Approve
            </button>
          </div>

          <div>
            <h2 className="font-semibold text-3xl md:text-2xl my-4 underline">
              Basic Info
            </h2>

            <div className="grid grid-cols-2  gap-4">
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
                        {updatedFields.includes(field) && (
                          <span className="text-xs text-green-500 ml-2">
                            new
                          </span>
                        )}
                      </p>
                    ))
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-y-10">
            <div>
              <h2 className="font-semibold text-3xl md:text-2xl my-4 flex items-end">
                <p className="underline">Personality Info</p>
                {updatedFields?.includes("personality") && (
                  <span className="font-normal text-xs text-green-500 ml-2">
                    new
                  </span>
                )}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {Object.keys(customer?.personality || []).map(
                  (key) =>
                    key != "_id" && (
                      <div key={key}>
                        <p className="font-semibold text-lg ">
                          {key.toUpperCase()}{" "}
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
export default AdminCustomer;
