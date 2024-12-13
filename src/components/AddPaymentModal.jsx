// import React, { useRef, useState } from "react";
// import { popupBtnText } from "../utils/sharedState";
// import { InputField } from "./mainComponents/InputField";
// import { toast } from 'react-toastify';
// import { MultiSelectField } from "./mainComponents/MultiSelectField";

// function AddPaymentPopup({
//   onCloseClick,
//   atEnd,
//   onConfirm,
//   continueBtnTxt = "",
//   confirmBtnTxt,
//   width = "1/2",
//   confirmBtnColor,
//   loading,
//   listing,
// }) {
//   const [amount, setAmount] = useState();
//   const [error, setError] = useState('');

//   const handleCloseClick = () => {
//     onCloseClick(false);
//   };
//   const popupRef = useRef();

//   const handleClick = () => {
//     if (!amount || amount <= 0) {
//       setError('Invalid amount, amount is required');
//       toast.error('Invalid amount, amount is required')
//       return;
//     } else {
//       onConfirm(amount);
//     }
//   }

//   console.log("listing=>", listing);
//   console.log("filterOptionsMap=>", filterOptionsMap);

//   const updatedListing = {
//     "Users": listing.map(item => `${item.firstName} ${item.lastName}`)
//   };
//   console.log("updatedListing=>", updatedListing);


//   const [filter, setFilter] = useState({
//     users: [],
//   });

//   const filterStateNameMap = {
//     Users: "users",
//   };

//   const handleFilterChange = (key, value, remove) => {
//     console.log("filter changed occcured", key);
//     let stateKey = key.toLowerCase();
//     if (key == "Other Options") {
//       stateKey = "others"
//     }
//     console.log("key", stateKey, key);
//     let updatedArr = filter[stateKey];
//     console.log("updatedArr", updatedArr);
//     if (remove) {
//       updatedArr = updatedArr.filter((item) => item != value);
//     } else {
//       console.log("UpdatedArr", updatedArr, "value", value);
//       if (oneChoiceField.includes(stateKey)) {
//         updatedArr = [value];
//       }
//       updatedArr = [...updatedArr, value];
//     }
//     const updatedFilter = {
//       ...filter,
//       [stateKey]: updatedArr,
//     };
//     const checkIfApplied = Object.values(updatedFilter).some(
//       (value) => value.length > 0
//     );
//     updatedFilter.isApplied = checkIfApplied; // to check whether filter is applied or not
//     setFilter(updatedFilter);
//   };

//   console.log('errro', error);

//   return (
//     <div
//       class={`w-11/12 md:w-${width} fixed ${atEnd ? "bottom-0" : "top-1/2"}
//       left-1/2 -translate-x-1/2 -translate-y-${atEnd ? "0" : "1/2"} z-50`}
//       ref={popupRef}
//     >
//       <div class="relative p-4 w-full max-w-md max-h-full mx-auto">
//         <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 border-2">
//           <button
//             type="button"
//             class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//             data-modal-hide="popup-modal"
//             onClick={handleCloseClick}
//           >
//             <svg
//               class="w-3 h-3"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 14 14"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//               />
//             </svg>
//             <span class="sr-only">Close modal</span>
//           </button>
//           <div class="p-5 text-center">
//             <svg
//               class="mx-auto mb-4 text-gray-400 w-6 md:w-12 md:h-12 dark:text-gray-200"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//               />
//             </svg>
//             <div className="mt-3 mb-5">
//               <InputField
//                 key={"number"}
//                 labelText={"Enter Balance ($)"}
//                 type={"number"}
//                 placeholder={"Amount"}
//                 name={"payment"}
//                 value={amount}
//                 onChange={(e) => { setAmount(e.target.value); setError(''); toast.error(''); }}
//                 required={true}
//               />
//               {error && <p className="text-red-500 mt-1 text-center"> {error} </p>}
//             </div>
//             <div id="filters" className="grid  md:grid-cols-3 gap-6">
//               {Object.keys(updatedListing).map((key) => (
//                 <MultiSelectField
//                   key={key}
//                   labelText={key}
//                   placeholderText={updatedListing[key][0]}
//                   dropdownOptions={updatedListing}
//                   selectedOptions={filter[filterStateNameMap[key]]}
//                   onChange={handleFilterChange}
//                 />
//               ))}
//             </div>
//             <div className="flex flex-col gap-y-2 ">
//               {continueBtnTxt && (
//                 <button
//                   data-modal-hide="popup-modal"
//                   type="button"
//                   className="text-white md:text-base text-sm bg-red-700 hover:bg-red-800 font-medium rounded-lg  px-5 py-2.5 text-center"
//                   onClick={() => onCloseClick(false)}
//                 >
//                   {popupBtnText[continueBtnTxt] ?? continueBtnTxt}
//                 </button>
//               )}
//               <button
//                 data-modal-hide="popup-modal"
//                 type="button"
//                 className={`text-white md:text-base text-sm ${confirmBtnColor ? "bg-red-700" : "bg-green-700"
//                   } hover:opacity-90  font-medium rounded-lg  px-5 py-2.5 text-center`}
//                 disabled={loading}
//                 onClick={handleClick}
//               >
//                 {confirmBtnTxt}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default AddPaymentPopup;


import React, { useRef, useState } from "react";
import { popupBtnText } from "../utils/sharedState";
import { InputField } from "./mainComponents/InputField";
import { toast } from 'react-toastify';
import { MultiSelectField } from "./mainComponents/MultiSelectField";

function AddPaymentPopup({
  onCloseClick,
  atEnd,
  onConfirm,
  continueBtnTxt = "",
  confirmBtnTxt,
  width = "1/2",
  confirmBtnColor,
  loading,
  listing,
}) {
  const [amount, setAmount] = useState();
  const [error, setError] = useState('');

  const handleCloseClick = () => {
    onCloseClick(false);
  };

  const popupRef = useRef();

  const handleClick = () => {
    if (!amount || amount <= 0) {
      setError('Invalid amount, amount is required');
      toast.error('Invalid amount, amount is required');
      return;
    } else {
      onConfirm(amount);
    }
  };

  const updatedListing = {
    "Users": listing.map(item => `${item.firstName} ${item.lastName}`)
  };

  const [filter, setFilter] = useState({
    users: [],
  });

  const filterStateNameMap = {
    Users: "users",
  };

  const handleFilterChange = (key, value, remove) => {
    console.log("filter changed occurred", key);
    let stateKey = key.toLowerCase();
    if (key === "Other Options") {
      stateKey = "others";
    }

    let updatedArr = filter[stateKey];
    if (remove) {
      updatedArr = updatedArr.filter((item) => item !== value);
    } else {
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
    updatedFilter.isApplied = checkIfApplied;
    setFilter(updatedFilter);
  };

  return (
    <div
      className={`w-11/12 md:w-${width} fixed ${atEnd ? "bottom-0" : "top-1/2"}
      left-1/2 -translate-x-1/2 -translate-y-${atEnd ? "0" : "1/2"} z-50`}
      ref={popupRef}
    >
      <div className="relative p-4 w-full max-w-md max-h-full mx-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border-2">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
            onClick={handleCloseClick}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-6 md:w-12 md:h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <div className="mt-3 mb-5">
              <InputField
                key={"number"}
                labelText={"Enter Balance ($)"}
                type={"number"}
                placeholder={"Amount"}
                name={"payment"}
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(''); toast.error(''); }}
                required={true}
              />
              {error && <p className="text-red-500 mt-1 text-center"> {error} </p>}
            </div>
            <div id="filters" className="">
              {Object.keys(updatedListing).map((key) => (
                <MultiSelectField
                  key={key}
                  labelText={key}
                  placeholderText={updatedListing[key][0]}
                  dropdownOptions={updatedListing[key]}  // Pass the array of users
                  selectedOptions={filter[filterStateNameMap[key]]}
                  onChange={handleFilterChange}
                />
              ))}
            </div>
            <div className="flex flex-col gap-y-2 ">
              {continueBtnTxt && (
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white md:text-base text-sm bg-red-700 hover:bg-red-800 font-medium rounded-lg  px-5 py-2.5 text-center"
                  onClick={() => onCloseClick(false)}
                >
                  {popupBtnText[continueBtnTxt] ?? continueBtnTxt}
                </button>
              )}
              <button
                data-modal-hide="popup-modal"
                type="button"
                className={`text-white md:text-base text-sm ${confirmBtnColor ? "bg-red-700" : "bg-green-700"
                  } hover:opacity-90  font-medium rounded-lg  px-5 py-2.5 text-center`}
                disabled={loading}
                onClick={handleClick}
              >
                {confirmBtnTxt}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPaymentPopup;
