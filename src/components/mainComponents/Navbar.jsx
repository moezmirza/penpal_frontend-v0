import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { signOut } from "firebase/auth";
import { setCurrentUser } from "../../state/slices/userSlice";
import { AuthContext } from "../../providers/AuthProvider";

const userNavbarLinkMap = {
  Home: "https://penpal.musingsinc.co/",
  Dashboard: "/#findpal",
  "List Inmates": "/list-inmate",
  "Manage Inmates": "/manage-inmates",
  Profile: "/user-profile",
  // Subscription: "/",
};
const unAuthNavbarLinkMap = {
  Home: "https://penpal.musingsinc.co/",
  Register: "/register",
  Login: "/login",
};
const adminNavbarLinkMap = {
  Home: "https://penpal.musingsinc.co/",
  "Approve Profiles": "/approve-profiles",
  "Approve Updates": "/approve-updates",
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
    updateAuthInfo({ token: "", adminAuth: false, userAuth: false });
    setShowDropdown(false);
    location.replace("/login");
  };
  const isUser = JSON.parse(localStorage.getItem("userAuth"));
  const isAdmin = JSON.parse(localStorage.getItem("adminAuth"));
  console.log("type", typeof isAdmin, isAdmin);
  return (
    <div className="bg-fr-blue-200 flex items-end justify-between w-full p-3 md:py-5 md:px-8 sticky top-0 z-50">
      <div className="text-xl md:text-2xl text-white font-medium ">
        {user?.firstName || "Welcome Pal"}
        <span className="text-4xl">.</span>
      </div>

      <div className="hidden md:block">
        <PCNavbar
          isUser={isUser}
          isAdmin={isAdmin}
          onSignout={handleSignout}
          onLinkClick={handleLinkClick}
        />
      </div>

      <div className="md:hidden">
        <MobileNavbar
          isUser={isUser}
          isAdmin={isAdmin}
          onSignout={handleSignout}
          onLinkClick={handleLinkClick}
          showDropdown={showDropdown}
          onShowDropdown={setShowDropdown}
        />
      </div>
    </div>
  );
}

function PCNavbar({ onSignout, onLinkClick, isAdmin, isUser }) {
  if (isUser) {
    return (
      <ul className="text-lg flex gap-x-2 text-white list-style-none">
        {Object.keys(userNavbarLinkMap).map((linkName) => (
          <li key={linkName} onClick={onLinkClick}>
            <Link
              to={userNavbarLinkMap[linkName]}
              className="block  px-4 py-1.5 md:py-2 hover:underline dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {linkName}
            </Link>
          </li>
        ))}
        <li
          className="block px-4 py-1.5 md:py-2 hover:underline  dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          onClick={onSignout}
        >
          Sign out
        </li>
      </ul>
    );
  }
  if (isAdmin) {
    return (
      <ul className="text-lg flex gap-x-2 text-white list-style-none">
        {Object.keys(adminNavbarLinkMap).map((linkName) => (
          <li key={linkName} onClick={onLinkClick}>
            <Link
              to={adminNavbarLinkMap[linkName]}
              className="block  px-4 py-1.5 md:py-2 hover:underline dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {linkName}
            </Link>
          </li>
        ))}
        <li
          className="block px-4 py-1.5 md:py-2 hover:underline  dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          onClick={onSignout}
        >
          Sign out
        </li>
      </ul>
    );
  }
  return (
    <div className="text-white flex gap-x-12 md:mr-12 text-lg">
      {Object.keys(unAuthNavbarLinkMap).map((tag) =>
        tag == "Home" ? (
          <a
            href={"https://penpal.musingsinc.co/"}
            className="cursor-pointer hover:underline"
          >
            Home
          </a>
        ) : (
          <Link
            to={unAuthNavbarLinkMap[tag]}
            className="cursor-pointer hover:underline"
          >
            {tag}
          </Link>
        )
      )}
    </div>
  );
}

function MobileNavbar({
  onSignout,
  onLinkClick,
  isAdmin,
  isUser,
  onShowDropdown,
  showDropdown,
}) {
  return (
    <div className="flex gap-x-6 items-center md:hidden">
      <div className="relative ">
        <div>
          <input
            type="checkbox"
            className="peer hidden"
            id="rotate-toggle"
            onClick={() => onShowDropdown(!showDropdown)}
          />
          <label htmlFor="rotate-toggle" className="icon block cursor-pointer">
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
                isAdmin={isAdmin}
                onSignout={onSignout}
                onLinkClick={onLinkClick}
                isUser={isUser}
              />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function NavbarOptions({ onSignout, onLinkClick, isAdmin, isUser }) {
  if (isAdmin) {
    return (
      <>
        {Object.keys(adminNavbarLinkMap).map((linkName) => (
          <li key={linkName} onClick={onLinkClick}>
            <Link
              to={adminNavbarLinkMap[linkName]}
              className="text-nowrap block px-4 py-1.5 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
  if (isUser) {
    return (
      <>
        {Object.keys(userNavbarLinkMap).map((linkName) => (
          <li key={linkName} onClick={onLinkClick}>
            <Link
              to={userNavbarLinkMap[linkName]}
              className="block  px-4 py-1.5 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
