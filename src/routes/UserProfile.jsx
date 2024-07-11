import React, { useEffect, useRef, useState } from "react";
import { post } from "../api/post";

function UserProfile() {
  const genderList = [
    "Male",
    "Female",
    "Gay",
    "Bisexual",
    "Lesbian",
    "Straight",
    "Transgender",
    "LBGTQ+ ",
    "Other",
  ];
  const imageRef = useRef(null);
  const imageFile = useRef(null);

  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    state: "",
    email: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setProfileDetails({
      ...profileDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in profileDetails) {
      if (profileDetails[key] == "") {
        setError("All fields are required!");
        break;
      }
    }
  };
  useEffect(() => {
    async function fetchUserDetails() {
      // const { success, data, error } = await post(formData);
      // setProfileDetails(data);
    }
    fetchUserDetails();
  }, []);

  const handleClick = () => {
    console.log(imageRef.current.click());
  };
  const handleImageChange = () => {
    const files = imageRef.current.files;
    console.log("imageFile", files);

    if (files.length > 0) {
      const src = URL.createObjectURL(files[0]);
      const preview = document.getElementById("avatar-preview");
      preview.src = src;
    }
  };
  return (
    <div className="bg-general p-6">
      <div
        id="card"
        className="bg-gray-100 flex flex-col gap-y-8 pb-10 w-6/12 items-center m-auto rounded-lg"
      >
        <div className="bg-gray-300 w-full rounded-lg p-6 flex flex-col items-center gap-y-6">
          <h1 className="text-3xl font-semibold">Edit Profile</h1>
          <div className="w-fit m-auto relative">
            <div className="rounded-full w-48 h-48 md:w-52 md:h-52 overflow-hidden flex justify-center  ">
              <img
                className="rounded-full w-full h-full object-cover object-top"
                src={"/static/default.jpg"}
                alt="user avatar"
                id="avatar-preview"
              />
            </div>
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
            <button
              className="absolute bottom-4 right-4 bg-white p-2 rounded-full"
              onClick={handleClick}
            >
              <img src="/static/icons/edit.svg" alt="auth" className="h-6 " />
            </button>
          </div>
        </div>

        <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
          <div className="m-auto font-semibold text-2xl">Details</div>
          {error && <p className="text-fr-red m-auto">{error}</p>}
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-6">
              <label>
                Fisrt Name
                <input
                  type="text"
                  name="firstName"
                  value={profileDetails.firstName}
                  onChange={handleChange}
                  className="bg-transparent block w-full mt-2 rounded-md p-1 border border-gray-400 outline-none focus:border-gray-700 "
                />
              </label>
              <label>
                Last Name
                <input
                  name="lastName"
                  type="text"
                  value={profileDetails.lastName}
                  onChange={handleChange}
                  className="bg-transparent block w-full mt-2 rounded-md p-1 border border-gray-400 outline-none focus:border-gray-700 "
                />
              </label>
              <label>
                Email
                <input
                  value={profileDetails.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  className=" bg-transparent block w-full mt-2 rounded-md p-1 border border-gray-400 outline-none focus:border-gray-700 "
                />
              </label>
            </div>
            <div className="flex flex-col gap-y-6">
              <label>
                Age
                <input
                  name="age"
                  type="text"
                  value={profileDetails.age}
                  onChange={handleChange}
                  className=" bg-transparent block w-full mt-2 rounded-md p-1 border border-gray-400 outline-none focus:border-gray-700 "
                />
              </label>
              <div className="relative inline-block w-full">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={profileDetails.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 p-2 text-base border border-gray-400  outline-none focus:border-gray-700 sm:text-sm rounded-md bg-transparent cursor-pointer"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  {genderList.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                  genderList
                </select>
              </div>
              <label>
                State
                <input
                  name="state"
                  type="text"
                  value={profileDetails.state}
                  onChange={handleChange}
                  className=" bg-transparent block w-full mt-2 rounded-md p-1 border border-gray-400 outline-none focus:border-gray-700 "
                />
              </label>
            </div>
          </div>
          <button className="bg-fr-blue w-full text-white p-2 rounded hover:bg-fr-blue-100">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
