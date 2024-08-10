import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { signOut } from "firebase/auth";
import { setCurrentUser } from "../../state/slices/userSlice";
import { AuthContext } from "../../providers/AuthProvider";

const userNavbarLinkMap = {
  Home: "https://awayoutpenpals.com/",
  Dashboard: "/#findpal",
  "Submit a Profile": "/list-inmate",
  "Manage Profiles": "/manage-inmates",
  "Update/Renew Profiles": "/update-inmates",
  "Search Profiles": "/search-profiles",
  "My Account": "/user-profile",
};
const unAuthNavbarLinkMap = {
  Home: "https://awayoutpenpals.com/",
  Register: "/register",
  Login: "/login",
};
const adminNavbarLinkMap = {
  Home: "https://awayoutpenpals.com/",
  "Approve Profiles": "/approve-profiles",
  "Approve Updates": "/approve-updates",
  "Delete Profiles": "/delete-profiles",
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
    <div className="bg-fr-blue-200 flex items-center  xl:items-end justify-between w-full py-5 xl:py-5 px-4 sticky top-0 z-50">
      <p className="text-xl md:text-2xl text-white font-medium text-center h-fit">
        {isUser ? user?.firstName : isAdmin ? "Admin" : "Welcome Pal"}.
      </p>

      <div className="hidden xl:block">
        <PCNavbar
          isUser={isUser}
          isAdmin={isAdmin}
          onSignout={handleSignout}
          onLinkClick={handleLinkClick}
        />
      </div>

      <div className="xl:hidden">
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
  const [profileDropdown, setProfileDropdown] = useState(false);
  if (isUser) {
    return (
      <ul className="flex text-white list-style-none text-sm md:text-base">
        {Object.keys(userNavbarLinkMap).map((linkName) => (
          <li key={linkName} onClick={onLinkClick}>
            {linkName == "My Account" ? (
              <div>
                <div
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="block  px-4 py-1.5 md:py-2 hover:underline dark:hover:bg-gray-600 cursor-pointer"
                >
                  {linkName}
                </div>
                {profileDropdown && (
                  <div className="absolute bg-white rounded-lg flex flex-col">
                    <Link
                      onClick={() => setProfileDropdown(false)}
                      to={"/user-profile?sect=profile"}
                      className="border-b-2 px-2 py-1 md:px-4 md:py-2 text-black  "
                    >
                      Profile
                    </Link>
                    <Link
                      onClick={() => setProfileDropdown(false)}
                      to={"/user-profile?sect=questionnaire"}
                      className="border-b-2 px-2 py-1 md:px-4 md:py-2 text-black  "
                    >
                      Questionnaire
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={userNavbarLinkMap[linkName]}
                className="block  px-4 py-1.5 md:py-2 hover:underline dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {linkName}
              </Link>
            )}
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
          <Link
            to={unAuthNavbarLinkMap[tag]}
            className="cursor-pointer hover:underline"
          >
            {tag}
          </Link>
        )
      }
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
    <div className="flex gap-x-6 items-center ">
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
              className="h-6 md:h-7 xl:h-8 cursor-pointer transition-transform duration-300"
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
  const [profileDropdown, setProfileDropdown] = useState(false);
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
        {Object.keys(userNavbarLinkMap).map((linkName) =>
          linkName == "My Account" ? (
            <li key={linkName}>
              <div>
                <div
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="block  px-4 py-1.5 md:py-2 hover:underline dark:hover:bg-gray-600 cursor-pointer"
                >
                  {linkName}
                </div>
                {profileDropdown && (
                  <div className="absolute bg-white rounded-lg flex flex-col">
                    <Link
                      onClick={() => {
                        setProfileDropdown(false);
                        onLinkClick();
                      }}
                      to={"/user-profile?sect=profile"}
                      className="border-b-2 px-2 py-1 md:px-4 md:py-2 text-black  "
                    >
                      Profile
                    </Link>
                    <Link
                      onClick={() => {
                        setProfileDropdown(false);

                        onLinkClick();
                      }}
                      to={"/user-profile?sect=questionnaire"}
                      className="border-b-2 px-2 py-1 md:px-4 md:py-2 text-black  "
                    >
                      Questionnaire
                    </Link>
                  </div>
                )}
              </div>
            </li>
          ) : (
            <li key={linkName} onClick={onLinkClick}>
              <Link
                to={userNavbarLinkMap[linkName]}
                className="block  px-4 py-1.5 md:py-2 hover:underline dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {linkName}
              </Link>
            </li>
          )
        )}
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
