import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function CompleteProfilePopup({ onCloseClick, atEnd }) {
  const handleCloseClick = () => {
    onCloseClick(false);
  };
  const navigate = useNavigate();
  const popupRef = useRef();
  return (
    <div
      class={`w-full md:w-fit absolute ${
        atEnd ? "bottom-0" : "top-1/2"
      } left-1/2 -translate-x-1/2 -translate-y-${atEnd ? "0" : "1/2"} z-20`}
      ref={popupRef}
    >
      <div class="relative p-4 w-full max-w-md max-h-full ">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
            onClick={handleCloseClick}
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-5 text-center ">
            <svg
              class="mx-auto mb-4 text-gray-400 w-6 md:w-12 md:h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 class="mb-5 md:text-lg text-sm font-normal text-gray-500 dark:text-gray-400">
              Complete your profile to unlock all profiles
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              class="text-white md:text-sm text-xs bg-blue-600 hover:bg-blue-800 font-medium rounded-lg inline-flex items-center px-5 py-2.5 text-center"
              onClick={() => navigate("/user-profile")}
            >
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompleteProfilePopup;
