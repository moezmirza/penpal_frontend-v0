import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { includesCaseInsensitive } from "../Admin/ApproveUpdates";
import CustomerCard from "../../components/CustomerCard";

function UpdateCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreMsg, setLoadMoreMsg] = useState("");
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef();
  const itemsPerPage = 40;

  const get = useGet();
  const navigate= useNavigate()

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { success, data, error } = await get(
        `/customer?p=0&l=${itemsPerPage}`
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
        `/customer?p=${page}&l=${itemsPerPage}`
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

  const filteredCustomers = customers?.filter(
    (customer) =>
      includesCaseInsensitive(customer?.basicInfo?.firstName, inputVal) ||
      includesCaseInsensitive(customer?.basicInfo?.lastName, inputVal)
  );

  return (
    <div className="flex flex-col gap-y-6  items-center justify-between mt-12 mb-32  p-4 md:p-0 relative w-full">
      <h1 className="text-2xl md:text-4xl font-bold underline">
        Update/Renew Profiles
      </h1>
      <div className="flex flex-col md:flex-row gap-6 md:w-7/12 w-11/12 items-center">
        <input
          className="bg-transparent block w-full mt-1 rounded-md p-2 border border-gray-400 outline-none focus:border-gray-700 "
          placeholder={"Search customer..."}
          value={inputVal}
          ref={inputRef}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <p className="font-semibold md:text-2xl text-nowrap">
          Total: {filteredCustomers?.length}
        </p>
      </div>
      <LoadingSpinner isLoading={loading} />
      {filteredCustomers.length == 0 && !loading ? (
        <p className="text-center text-sm md:text-base">
          No profiles to display
        </p>
      ) : (
        <div className="flex flex-col gap-y-6 w-full md:w-9/12">
          {filteredCustomers.map((customer, index) => (
            <CustomerCard
              key={index}
              customer={customer}
              onUpdate={() => navigate(`/update-inmate/${customer?._id}`)}
              onRenew={() =>
                navigate(`/payment`, {
                  state: {
                    cid: customer?._id,
                    paymentDetails: {
                      renewal: true,
                      totalAmount: 79.95,
                    },
                  },
                })
              }
              showExpiresAt={true}
            />
          ))}
        </div>
      )}
      {isLoadingMore ? (
        <p className="text-center">Loading...</p>
      ) : loadMoreMsg ? (
        <div className="text-center ">{loadMoreMsg}</div>
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

// function CustomerCard({ customer }) {
//   const navigate = useNavigate();
//   const profileApproved = customer?.profileApproved == false;
//   const updateApproved = customer?.updateApproved == false;
//   const infoText = profileApproved
//     ? "Profile approval needed"
//     : updateApproved && "Updates approval needed";
//   return (
//     <div
//       id="customer-card"
//       className={`bg-gray-100 rounded-md border border-gray-300 p-2 px-4 w-full md:w-10/12 mx-auto flex flex-col gap-y-6 gap-x-4 md:flex-row`}
//       // className={`bg-gray-100 rounded-md border ${
//       //   profileApproved == false || updateApproved == false
//       //     ? "border-red-500"
//       //     : "border-gray-300"
//       // }  p-2 px-4 w-full md:w-10/12 mx-auto flex flex-col gap-y-6 gap-x-4 md:flex-row`}
//     >
//       <img
//         src={customer?.photos?.imageUrl || "/assets/default.jpg"}
//         alt=""
//         className="h-80 w-full md:w-44 md:h-44 rounded"
//       />
//       <div className="flex flex-col gap-y-3 md:w-7/12 w-full ">
//         <div>
//           <div className=" flex flex-col items-center md:flex-row md:gap-2 mb-4 md:mb-2">
//             <p className="font-semibold md:text-3xl text-lg ">
//               {customer?.basicInfo?.firstName} {customer?.basicInfo?.lastName}
//             </p>
//             {/* {(profileApproved == false || updateApproved == false) && (
//               <p className="text-red-500 text-sm font-normal">{infoText}</p>
//             )} */}
//           </div>

//           <div className="flex gap-x-4">
//             <p className="hidden md:block">
//               {customer?.basicInfo?.age || "N/A"} yrs
//             </p>
//             <p className="hidden md:block">
//               {customer?.basicInfo?.gender || "N/A"}
//             </p>
//             <p className="hidden md:block">
//               {customer?.basicInfo?.orientation || "N/A"}
//             </p>
//             <p className="hidden md:block">
//               {customer?.basicInfo?.race || "N/A"}
//             </p>
//             <span className="flex gap-x-1 items-baseline">
//               <img src="/assets/icons/star.svg" alt="" className="h-4" />{" "}
//               {customer?.basicInfo?.rating || 0}
//             </span>
//             <p className="underline">
//               {customer?.basicInfo?.numRatings || 0} Reviews
//             </p>
//           </div>
//         </div>
//         <p>
//           <span className="font-medium mr-1">Inmate#:</span>
//           {customer?.basicInfo?.inmateNumber || "N/A"}
//         </p>
//         <p>
//           <span className="font-medium mr-1"> Expires on:</span>
//           {customer?.basicInfo?.expiresAt || "N/A"}
//         </p>
//         <p>
//           <span className="font-medium mr-1"> Mainling Addres:</span>
//           {customer?.basicInfo?.mailingAddress || "N/A"}
//         </p>
//       </div>
//       <div className="w-full md:w-fit ml-auto flex flex-col my-auto">
//         <button
//           type="button"
//           className="mt-4 bg-green-600 text-white text-base md:text-lg  px-8 py-3 rounded hover:opacity-90"
//           onClick={() =>
//             navigate(`/payment`, {
//               state: {
//                 cid: customer?._id,
//                 paymentDetails: {
//                   renewal: true,
//                   totalAmount: 79.95,
//                 },
//               },
//             })
//           }
//         >
//           Renew
//         </button>
//         <button
//           type="button"
//           className="mt-4 bg-fr-blue-200 text-white text-base md:text-lg  px-8 py-3 rounded hover:opacity-90"
//           onClick={() => navigate(`/update-inmate/${customer?._id}`)}
//         >
//           Update
//         </button>
//         {/* <button
//           type="button"
//           className="mt-4 border text-black px-5 py-3 border-fr-blue-200 rounded hover:opacity-90"
//           onClick={() => navigate(`/inmate/${customer?._id}`)}
//         >
//           View Details
//         </button> */}
//       </div>
//     </div>
//   );
// }

export default UpdateCustomers;
