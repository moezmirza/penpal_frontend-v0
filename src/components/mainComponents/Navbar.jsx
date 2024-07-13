import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  return (
    <ul className="bg-fr-blue-200 flex items-center justify-between w-full p-5">
      <li className="text-2xl text-white font-medium flex items-baseline ">
        {user?.firstName}
        <p className="text-4xl">.</p>
      </li>
      <div className="flex gap-x-6 items-center">
        <li>
          <img
            src={user.imageUrl || "/static/default.jpg"}
            alt=""
            className="h-10 w-10 rounded-full object-cover object-top  outline outline-4 outline-white"
          />
        </li>
        <li>
          <div className="relative ">
            <div>
              <input
                type="checkbox"
                className="peer hidden"
                id="rotate-toggle"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              <label
                htmlFor="rotate-toggle"
                className="icon block cursor-pointer"
              >
                <img
                  src={"/static/icons/settings.svg"}
                  alt=""
                  className="h-8 cursor-pointer transition-transform duration-300"
                />
              </label>
            </div>

            {showDropdown && (
              <div
                id="dropdown"
                className="absolute right-0.5 top-11 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <Link
                      to={"/"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"user-profile"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Subscription
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </li>
      </div>
    </ul>
  );
}

export { Navbar };
