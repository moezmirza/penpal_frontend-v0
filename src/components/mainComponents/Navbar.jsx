import React, { useContext, useEffect, useRef, useState } from "react";
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
  "Explore Profiles": "/explore-profiles",
  "My Account": "/user-profile",
};
const unAuthNavbarLinkMap = {
  Home: "https://awayoutpenpals.com/",
  Dashboard: "/#findpal",
  "Submit a Profile": "/list-inmate",
  "Manage Profiles": "/manage-inmates",
  "Update/Renew Profiles": "/update-inmates",
  "Explore Profiles": "/explore-profiles",
  Register: "/register",
  Login: "/login",
};
const adminNavbarLinkMap = {
  Home: "https://awayoutpenpals.com/",
  "Approve Profiles": "/approve-profiles",
  "Approve Updates": "/approve-updates",
  "Create Profile": "/admin/create-profile",
  "Update Profiles": "/update-profiles",
  "Delete/Deactivate Profiles": "/delete-profiles",
};
function Navbar() {
  const user = useSelector((state) => state.user.currentUser);
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [exploreProfileDropdown, setExploreProfileDropdown] = useState(false)
  const navbarRef = useRef()
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
  const exploreProfileDropdownLinkMap = {
    "LGBTQ+": "lgbtq+",
    "Premium": "premiumPlacement",
    "Featured": "featuredPlacement",
    "Recently Updated": "recentlyUpdated",
    "Newly Listed": "newlyListed",
    "Veteran": "veteran",
    "Male": "male",
    "Female": "female",
    "View All": "viewAll"
  };

  const profileDropdownLinkMap = {
    "Profile": "profile",
    "Questionnaire": "questionnaire"
  }
  const isUser = JSON.parse(localStorage.getItem("userAuth"));
  const isAdmin = JSON.parse(localStorage.getItem("adminAuth"));
  console.log("type", typeof isAdmin, isAdmin);

  const handleClickOutside = (e) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target) && (showDropdown || exploreProfileDropdown || profileDropdown)) {
      console.log("inside click", navbarRef)
      setShowDropdown(false)
      setExploreProfileDropdown(false)
      setProfileDropdown(false)
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleClickOutside)
    return () => window.removeEventListener("click", handleClickOutside)
  }, [showDropdown, exploreProfileDropdown, profileDropdown])

  return (
    <div ref={navbarRef} className="flex items-center xl:items-end text-fr-blue-200 font-semibold justify-between w-full py-5 py-5 px-4 fixed top-0 z-50 bg-white">
      <p className="text-xl md:text-2xl text-center h-fit">
        {isUser ? user?.firstName : isAdmin ? "Admin" : "Welcome Pal"}.
      </p>

      <div className="hidden xl:block">
        <PCNavbar
          isUser={isUser}
          isAdmin={isAdmin}
          onSignout={handleSignout}
          onLinkClick={handleLinkClick}
          exploreProfileDropdownLinkMap={exploreProfileDropdownLinkMap}
          profileDropdownLinkMap={profileDropdownLinkMap}
          profileDropdown={profileDropdown}
          exploreProfileDropdown={exploreProfileDropdown}
          onProfileDropdown={setProfileDropdown}
          onExploreProfileDropdown={setExploreProfileDropdown}
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
          profileDropdownLinkMap={profileDropdownLinkMap}
          exploreProfileDropdownLinkMap={exploreProfileDropdownLinkMap}
          profileDropdown={profileDropdown}
          exploreProfileDropdown={exploreProfileDropdown}
          onProfileDropdown={setProfileDropdown}
          onExploreProfileDropdown={setExploreProfileDropdown}
        />
      </div>
    </div>
  );
}

function PCNavbar({ onSignout, onLinkClick, isAdmin, isUser, exploreProfileDropdownLinkMap, profileDropdown, exploreProfileDropdown, profileDropdownLinkMap, onProfileDropdown, onExploreProfileDropdown }) {
  if (isUser) {
    return (
      <ul className="flex list-style-none text-sm md:text-lg">
        {Object.keys(userNavbarLinkMap).map((linkName) => (
          <li key={linkName} onClick={onLinkClick}>
            {linkName == "My Account" ? (
              <div>
                <div
                  onClick={() => {
                    onExploreProfileDropdown(false)
                    onProfileDropdown(!profileDropdown)
                  }}
                  className="block  px-4 py-1.5 md:py-2 hover:underline dark:hover:bg-gray-600 cursor-pointer"
                >
                  {linkName}
                </div>
                {profileDropdown && (
                  <div className="absolute bg-white border border-gray-400 rounded-lg flex flex-col font-normal">
                    {Object.keys(profileDropdownLinkMap).map((linkName) => <Link
                      onClick={() => onProfileDropdown(false)}
                      to={`/user-profile?sect=${profileDropdownLinkMap[linkName]}`}
                      className="border-b-2 border-gray-300 px-2 py-1 md:px-4 md:py-2 text-black hover:bg-gray-200 "

                    >
                      {linkName}
                    </Link>)}
                  </div>
                )}
              </div>
            ) : linkName == "Explore Profiles" ?
              <div>
                <div
                  onClick={() => {
                    onProfileDropdown(false)
                    onExploreProfileDropdown(!exploreProfileDropdown)
                  }}
                  className="block  px-4 py-1.5 md:py-2 hover:underline dark:hover:bg-gray-600 cursor-pointer"
                >
                  {linkName}
                </div>
                {exploreProfileDropdown && (
                  <div className="absolute bg-white border border-gray-500 rounded-lg flex flex-col font-normal">
                    {Object.keys(exploreProfileDropdownLinkMap).map((linkName) =>
                      <Link
                        onClick={() => onExploreProfileDropdown(false)}
                        to={`/explore-profiles?search=${exploreProfileDropdownLinkMap[linkName]}`}
                        className="border-b-2 border-gray-300 px-2 py-1 md:px-4 md:py-2 text-black hover:bg-gray-200 "
                      >
                        {linkName}
                      </Link>
                    )}
                  </div>
                )}

              </div>

              : (
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
      <ul className="md:text-lg flex gap-x-2 list-style-none">
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
    <div className="flex text-sm  md:text-lg">
      {Object.keys(unAuthNavbarLinkMap).map((linkName) =>
        linkName == "Explore Profiles" ?
          <div>
            <div
              onClick={() => {
                onProfileDropdown(false)
                onExploreProfileDropdown(!exploreProfileDropdown)
              }}
              className="block  px-4 py-1.5 md:py-2 hover:underline dark:hover:bg-gray-600 cursor-pointer"
            >
              {linkName}
            </div>
            {exploreProfileDropdown && (
              <div className="absolute bg-white border border-gray-500 rounded-lg flex flex-col font-normal">
                {Object.keys(exploreProfileDropdownLinkMap).map((linkName) =>
                  <Link
                    onClick={() => onExploreProfileDropdown(false)}
                    to={`/explore-profiles?search=${exploreProfileDropdownLinkMap[linkName]}`}
                    className="border-b-2 border-gray-300 px-2 py-1 md:px-4 md:py-2 text-black hover:bg-gray-200 "
                  >
                    {linkName}
                  </Link>
                )}
              </div>
            )}

          </div> :
          <Link
            to={unAuthNavbarLinkMap[linkName]}
            className="block  px-4 py-1.5 md:py-2 hover:underline dark:hover:bg-gray-600 cursor-pointer"
          >
            {linkName}
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
  profileDropdownLinkMap,
  exploreProfileDropdownLinkMap,
  profileDropdown,
  exploreProfileDropdown,
  onProfileDropdown,
  onExploreProfileDropdown
}) {
  return (
    <div className="flex gap-x-6 items-center text-sm ">
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
              className="py-1 md:py-2 text-gray-700 dark:text-gray-200 font-normal"
              aria-labelledby="dropdownDefaultButton"
            >
              <NavbarOptions
                isAdmin={isAdmin}
                onSignout={onSignout}
                onLinkClick={onLinkClick}
                isUser={isUser}
                profileDropdownLinkMap={profileDropdownLinkMap}
                exploreProfileDropdownLinkMap={exploreProfileDropdownLinkMap}
                onShowDropdown={onShowDropdown}
                profileDropdown={profileDropdown}
                exploreProfileDropdown={exploreProfileDropdown}
                onProfileDropdown={onProfileDropdown}
                onExploreProfileDropdown={onExploreProfileDropdown}
              />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function NavbarOptions({ onShowDropdown, onSignout, onLinkClick, isAdmin, isUser, profileDropdownLinkMap, exploreProfileDropdownLinkMap,
  profileDropdown, exploreProfileDropdown, onProfileDropdown, onExploreProfileDropdown
}) {
  if (isAdmin) {
    return (
      <>
        {Object.keys(adminNavbarLinkMap).map((linkName) => (
          <li key={linkName} onClick={onLinkClick}>
            <Link
              to={adminNavbarLinkMap[linkName]}
              className="block px-2 py-1.5 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {linkName}
            </Link>
          </li>
        ))}
        <li
          className="block px-2 py-1.5 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
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
                  onClick={() => onProfileDropdown(!profileDropdown)}
                  className="px-3 py-1.5 md:py-2 hover:underline dark:hover:bg-gray-600 cursor-pointer"
                >
                  {linkName}
                </div>
                {profileDropdown && (
                  <div className="absolute bg-white border border-gray-400 rounded-lg flex flex-col font-normal">
                    {Object.keys(profileDropdownLinkMap).map((linkName) => <Link
                      onClick={() => onProfileDropdown(false)}
                      to={`/user-profile?sect=${profileDropdownLinkMap[linkName]}`}
                      className="border-b-2 border-gray-300 px-2 py-1 md:px-4 md:py-2 text-black hover:bg-gray-200 "
                    >
                      {linkName}
                    </Link>)}
                  </div>
                )}
              </div>
            </li>
          ) : linkName == "Explore Profiles" ?
            <li>
              <div
                onClick={() => {
                  onProfileDropdown(false)
                  onExploreProfileDropdown(!exploreProfileDropdown)
                }}
                className="block  px-3 py-1.5 md:py-2 hover:underline dark:hover:bg-gray-600 cursor-pointer"
              >
                {linkName}
              </div>
              {exploreProfileDropdown && (
                <div className="absolute bg-white border border-gray-400 rounded-lg flex flex-col">
                  {Object.keys(exploreProfileDropdownLinkMap).map((linkName) =>
                    <Link
                      onClick={() => {
                        onProfileDropdown(false)
                        onExploreProfileDropdown(false)
                        onShowDropdown(false)
                      }}
                      to={`/explore-profiles?search=${exploreProfileDropdownLinkMap[linkName]}`}
                      className="border-b-2 border-gray-300 px-2 py-1 md:px-4 md:py-2 text-black hover:bg-gray-200 "

                    >
                      {linkName}
                    </Link>
                  )}
                </div>
              )}
            </li>

            : (
              <li key={linkName} onClick={onLinkClick}>
                <Link
                  to={userNavbarLinkMap[linkName]}
                  className="block  px-3 py-1.5 md:py-2 hover:underline dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {linkName}
                </Link>
              </li>
            )
        )
        }
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
    <>
      {Object.keys(unAuthNavbarLinkMap).map((linkName) => linkName == "Explore Profiles" ?
        <li>
          <div
            onClick={() => {
              onProfileDropdown(false)
              onExploreProfileDropdown(!exploreProfileDropdown)
            }}
            className="px-3 py-1.5 md:py-2 hover:underline dark:hover:bg-gray-600 cursor-pointer"
          >
            {linkName}
          </div>
          {exploreProfileDropdown && (
            <div className="absolute bg-white border border-gray-500 rounded-lg flex flex-col font-normal">
              {Object.keys(exploreProfileDropdownLinkMap).map((linkName) =>
                <Link
                  onClick={() => onExploreProfileDropdown(false)}
                  to={`/explore-profiles?search=${exploreProfileDropdownLinkMap[linkName]}`}
                  className="border-b-2 border-gray-300 px-2 py-1 md:px-4 md:py-2 text-black hover:bg-gray-200 "
                >
                  {linkName}
                </Link>
              )}
            </div>
          )}
        </li> :
        <li>
          <Link
            to={unAuthNavbarLinkMap[linkName]}
            className="block px-3 py-1.5 md:py-2 hover:underline dark:hover:bg-gray-600 dark:hover:text-white"

          >
            {linkName}
          </Link>
        </li>
      )}
    </>
  );
}
export { Navbar };
