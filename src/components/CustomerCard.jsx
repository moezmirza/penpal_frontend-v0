import React from "react";
import { useNavigate } from "react-router-dom";

function CustomerCard({
  showExpiresAt,
  customer,
  onUpdate,
  onRenew,
  onUpdateApproval,
  onProfileApproval,
  onProfileDeletion,
  onViewUpdate,
  onViewDetails,
}) {
  console.log("customerCard", customer, customer?.basicInfo);
  const navigate = useNavigate();
  return (
    <div
      id="customer-card"
      className={`bg-gray-100 rounded-md border   ${
        customer?.isFavorite ? "border-green-500" : "border-gray-300"
      }  py-2 px-4 w-full flex flex-col gap-y-6 gap-x-4 md:flex-row md:items-center`}
    >
      <img
        src={customer?.photos?.imageUrl || "/assets/default.jpg"}
        alt=""
        className="h-80 w-full md:w-44 md:h-44 rounded"
      />
      <div className="flex flex-col gap-y-3 md:w-7/12 w-full ">
        <div className=" ">
          <div className="flex gap-x-6 items-baseline">
            <p className="font-semibold md:text-3xl text-lg mb-4 md:mb-1">
              {customer?.basicInfo?.firstName} {customer?.basicInfo?.lastName}
            </p>
            <img
              src={`assets/icons/${customer?.isFavorite && "filledHeart.svg"}`}
              alt=""
              className="h-6"
            />
          </div>

          <div className="flex gap-x-4 gap-y-1 flex-wrap ">
            <p className="hidden md:block">
              {customer?.basicInfo?.age || "N/A"} yrs
            </p>
            <p className="hidden md:block">
              {customer?.basicInfo?.gender || "N/A"}
            </p>
            <p className="hidden md:block">
              {customer?.basicInfo?.orientation || "N/A"}
            </p>
            <p className="hidden md:block">
              {customer?.basicInfo?.race || "N/A"}
            </p>
            <span className="flex gap-x-1 items-baseline">
              <img src="/assets/icons/star.svg" alt="" className="h-4" />{" "}
              {customer?.rating || 0}
            </span>
            <p className="underline">{customer?.numRatings || 0} Reviews</p>
          </div>
        </div>
        <p>
          <span className="font-medium mr-1">Inmate#:</span>
          {customer?.basicInfo?.inmateNumber || "N/A"}
        </p>
        {showExpiresAt ? (
          <p>
            <span className="font-medium mr-1">Expires At:</span>
            {customer?.customerStatus?.expiresAt?.split("T")[0] || "N/A"}
          </p>
        ) : (
          <p>
            <span className="font-medium mr-1">Location:</span>
            {customer?.basicInfo?.state || "N/A"}, {customer?.basicInfo?.city || "N/A"}
          </p>
        )}
        <p>
          <span className="font-medium mr-1"> Mainling Addres:</span>
          {customer?.basicInfo?.mailingAddress || "N/A"}
        </p>
      </div>
      <div className="w-full md:w-fit ml-auto flex flex-col my-auto">
        {onRenew && (
          <button
            type="button"
            className="mt-3 bg-green-600 text-white px-3 py-3 rounded-lg hover:opacity-90"
            onClick={onRenew}
          >
            Renew Profile
          </button>
        )}
        {onUpdate && (
          <button
            type="button"
            className="mt-3 bg-fr-blue-200 text-white px-3 py-3 rounded-lg hover:opacity-90"
            onClick={onUpdate}
          >
            Update Profile
          </button>
        )}
        {onUpdateApproval && (
          <>
            <button
              type="button"
              className="mt-3 bg-green-600 text-white px-3 py-3 rounded-lg hover:opacity-90"
              onClick={() => onUpdateApproval(true, customer._id)}
            >
              Approve Update
            </button>
            <button
              type="button"
              className="mt-3 bg-red-600 text-white px-3 py-3 rounded-lg hover:opacity-90"
              onClick={() => onUpdateApproval(false, customer._id)}
            >
              Reject Update
            </button>
          </>
        )}
        {onProfileApproval && (
          <button
            type="button"
            className="mt-3 bg-green-600 text-white px-3 py-3 rounded-lg hover:opacity-90"
            onClick={() => onProfileApproval(true, customer._id)}
          >
            Approve Profile
          </button>
        )}
        {onProfileDeletion && (
          <button
            type="button"
            className="mt-3 bg-red-600 text-white px-3 py-3 rounded-lg hover:opacity-90"
            onClick={() => onProfileDeletion(customer._id)}
          >
            Delete
          </button>
        )}
        {onViewUpdate && (
          <button
            type="button"
            className="mt-3 bg-fr-blue-200 text-white px-3 py-3 rounded-lg hover:opacity-90"
            onClick={onViewUpdate}
          >
            View Update
          </button>
        )}
        {onViewDetails && (
          <button
            type="button"
            className="mt-3 bg-fr-blue-200 text-white px-3 py-3 rounded-lg hover:opacity-90"
            onClick={onViewDetails}
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
}

export default CustomerCard;
