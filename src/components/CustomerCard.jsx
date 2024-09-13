import React from "react";
import { capitlize } from "../utils/sharedState";
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
  onProfileStatus,
  profileStatuses,
  deactivateBtnRef
}) {
  const customerStatus = customer?.customerStatus?.status
  const statusColorMap = {
    "active": "bg-green-500",
    "inactive": "bg-gray-500",
    "expired": "bg-red-500",
    "new": "bg-fr-blue-100",
    "unpaid": "bg-fr-blue-100",
    "unapproved": "bg-yellow-500",
  }
  const isAdmin = JSON.parse(localStorage.getItem("adminAuth"))
  console.log("customerCard", customer, customer?.basicInfo);
  return (
    <div
      id="customer-card"
      className={`bg-gray-100 rounded-md border  ${customer?.isFavorite ? "border-green-500" : "border-gray-300"
        }  py-2 px-4 w-full flex flex-col gap-y-6 gap-x-4 md:flex-row md:items-center`}
    >
      <img
        src={customer?.photos?.imageUrl || "/assets/default.jpg"}
        alt=""
        className="h-80 w-full md:w-44 md:h-44 rounded"
      />
      <div className="flex flex-col gap-y-3 md:w-7/12 w-full ">
        <div className=" ">
          <div className="flex gap-x-6 items-center">
            <p className="font-semibold md:text-3xl text-lg mb-4 md:mb-1">
              {customer?.basicInfo?.firstName} {customer?.basicInfo?.lastName}
            </p>
            {customer?.isFavorite &&
              <img
                src="assets/icons/filledHeart.svg"
                alt=""
                className="h-6 mb-1"
              />
            }
            {customer?.customerStatus?.featuredPlacement &&
              <img
                src="assets/icons/p1.png"
                alt=""
                className="h-6 cursor-pointer"
                title="featured"
              />
            }
            {customer?.customerStatus?.premiumPlacement &&
              <img
                src="assets/icons/p2.png"
                alt=""
                className="h-6 cursor-pointer"
                title="premium"
              />
            }
            {customerStatus && isAdmin &&
              <p className={`${statusColorMap[customerStatus]} text-white p-1  border py-0 rounded mb-1`}>
                {customerStatus == "new" ? "unpaid" : customerStatus}
              </p>
            }
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
            className={`mt-3 ${isAdmin ? "bg-green-600" : "bg-fr-blue-200"} text-white px-3 py-3 rounded-lg hover:opacity-90`}
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
        {onProfileStatus && profileStatuses.includes(customer?.customerStatus?.status) && (
          <button
            ref={deactivateBtnRef}
            type="button"
            className="mt-3 bg-green-600 text-white px-3 py-3 rounded-lg hover:opacity-90"
            onClick={() => onProfileStatus(customer._id)}
          >
            {capitlize(customer?.customerStatus?.status == "active" ? "Deactivate" : "Activate")}
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
    </div >
  );
}

export default CustomerCard;
