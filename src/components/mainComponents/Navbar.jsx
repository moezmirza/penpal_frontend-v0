import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { signOut } from "firebase/auth";
import { setCurrentUser } from "../../state/slices/userSlice";
import { AuthContext } from "../../providers/AuthProvider";

const userNavbarLinkMap = {
  "Find Pal": "/",
  Profile: "/user-profile",
  Chat: "/chat",
  Subscription: "/",
};
const unAuthNavbarLinkMap = {
  // "Admin Login": "/",
  Register: "/register",
  Login: "/login",
};
const adminNavbarLinkMap = {
  "Find Pal": "/find-pal",
  Profile: "/user-profile",
  Subscription: "/",
  Signout: "/",
};
function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const { updateAuthInfo } = useContext(AuthContext);
  const dispatch = useDispatch();
  const handleLinkClick = () => {
    setShowDropdown(false);
  };
  const handleSignout = () => {
    signOut(auth);
    dispatch(setCurrentUser(null));
    updateAuthInfo({ token: "", isAuth: false });
    setShowDropdown(false);
    location.replace("/login");
  };
  return (
    <ul className="bg-fr-blue-200 flex items-center justify-between w-full p-3 md:p-5 sticky top-0 z-50">
      <li className="text-xl md:text-2xl text-white font-medium flex items-baseline ">
        {user?.firstName || "Welcome Pal"}
        <p className="text-4xl">.</p>
      </li>
      <div className="flex gap-x-6 items-center">
        {user && (
          <li>
            <img
              src={user.imageUrl || "/assets/default.jpg"}
              alt=""
              className="md:h-10 md:w-10 h-8 w-8 rounded-full object-cover object-top  outline outline-4 outline-white"
            />
          </li>
        )}
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
                  src={"/assets/icons/settings.svg"}
                  alt=""
                  className="h-5 md:h-8 cursor-pointer transition-transform duration-300"
                />
              </label>
            </div>

            {showDropdown && (
              <div
                id="dropdown"
                className="absolute z-20 right-0.5 top-11 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 md:w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-1 md:py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <NavbarOptions
                    user={user}
                    onSignout={handleSignout}
                    onLinkClick={handleLinkClick}
                  />
                </ul>
              </div>
            )}
          </div>
        </li>
      </div>
    </ul>
  );
}

function NavbarOptions({ user, onSignout, onLinkClick }) {
  if (user) {
    return (
      <>
        {Object.keys(userNavbarLinkMap).map((linkName) => (
          <li key={linkName} onClick={onLinkClick}>
            <Link
              to={userNavbarLinkMap[linkName]}
              className="block px-4 py-1.5 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {linkName}
            </Link>
          </li>
        ))}
        <li
          className="block px-4 py-1.5 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          onClick={onSignout}
        >
          Sign out
        </li>
      </>
    );
  }
  return (
    <ul>
      {Object.keys(unAuthNavbarLinkMap).map((linkName) => (
        <li key={linkName} onClick={onLinkClick}>
          <Link
            to={unAuthNavbarLinkMap[linkName]}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            {linkName}
          </Link>
        </li>
      ))}
    </ul>
  );
}
export { Navbar };
