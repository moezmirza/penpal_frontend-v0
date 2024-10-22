import React, { useEffect, useRef, useState } from "react";
import { usePut } from "../../../api/usePut";
import { RequiredFieldLabel } from "../../../components/mainComponents/RequiredFieldLabel";
import { useDispatch, useSelector } from "react-redux";
import mapAuthCodeToMessage from "../../../utils/authCodeMap";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { setCurrentUser } from "../../../state/slices/userSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../services/firebase";
import { genderList } from "../../../utils/sharedState";
import { v4 } from "uuid";

export const formattedImageName = (name) => {
  return `imageNameS${name}imageNameE`;
};

function BasicInfo({ onShowTab }) {
  const imageRef = useRef(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const put = usePut();

  console.log("currentUser", currentUser);
  const [basicInfo, setBasicInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    state: "",
    email: "",
    bio: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setBasicInfo({
      ...basicInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in basicInfo) {
      if (!basicInfo[key] && key != "imageUrl") {
        setError("All fields are required!");
        return;
      }
    }
    setError("");
    setLoading(true);
    setDone(false);
    try {
      const uploadedImg = imageRef.current.files[0];
      if (uploadedImg) {
        console.log(
          "uploading img...",
          uploadedImg,
          "currentImageUrl",
          basicInfo.imageUrl
        );
        let imageName = formattedImageName(v4());
        if (basicInfo.imageUrl) {
          // using the old image
          let prevName = basicInfo.imageUrl.split("imageNameS")[1];
          prevName = prevName?.split("imageNameE")[0];
          if (prevName) {
            imageName = formattedImageName(prevName);
          }
        }
        const userProfileImgRef = ref(storage, `images/${imageName}`);
        const snapshot = await uploadBytes(userProfileImgRef, uploadedImg);
        const downloadUrl = await getDownloadURL(snapshot.ref);

        basicInfo.imageUrl = downloadUrl;
      }
      const { success, data, error } = await put("/user", basicInfo);
      if (success) {
        console.log("success", data);
        dispatch(setCurrentUser(data));
        if (!currentUser.profileComplete) {
          // when the profile is incomplete
          onShowTab(false);
        }
        setDone(true);
        console.log(currentUser);
      } else {
        console.log(error);
        setError(mapAuthCodeToMessage(error));
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(mapAuthCodeToMessage(err));
    }
  };

  useEffect(() => {
    if (currentUser && basicInfo.firstName == "") {
      // only set the fields in state
      const updatedFields = Object.keys(basicInfo).reduce((acc, key) => {
        if (key in currentUser) {
          acc[key] = currentUser[key];
        }
        return acc;
      }, {});

      setBasicInfo({ ...updatedFields });
    }
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
    <div
      id="card"
      className="bg-white flex flex-col gap-y-8 pb-10 items-center m-auto rounded-lg relative"
    >
      <LoadingSpinner isLoading={loading} isDone={done} />

      <div className="bg-gray-300 w-full rounded-lg p-6 flex flex-col items-center gap-y-6">
        <div className="w-fit m-auto relative">
          <img
            className="rounded-full md:w-52 md:h-52 w-36 h-36 object-cover object-top"
            src={basicInfo.imageUrl || "/assets/default.jpg"}
            alt="user avatar"
            id="avatar-preview"
          />
          <input
            ref={imageRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
          <button
            className="absolute md:bottom-2 md:right-2 bottom-4 right-1  z-20 bg-white p-1.5 rounded-full"
            onClick={handleClick}
          >
            <img
              src="/assets/icons/edit.svg"
              alt="auth"
              className="md:h-6 h-3"
            />
          </button>
        </div>
      </div>

      <form className="flex flex-col gap-y-6 text-sm p-2 md:text-base md:p-4 w-full ">
        <div className="m-auto font-semibold text-xl md:text-2xl">
          Edit Info
        </div>
        {error && <p className="text-fr-red m-auto">{error}</p>}
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-6 flex-col gap-y-4 md:flex-row">
            <label className="flex-grow">
              <RequiredFieldLabel labelText={"First Name"} />
              <input
                type="text"
                name="firstName"
                placeholder="Shane"
                value={basicInfo.firstName}
                onChange={handleChange}
                className="bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 "
              />
            </label>
            <label className="flex-grow">
              <RequiredFieldLabel labelText={"Last Name"} />
              <input
                name="lastName"
                type="text"
                placeholder="Edwards"
                value={basicInfo.lastName}
                onChange={handleChange}
                className="bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 "
              />
            </label>
          </div>
          <label>
            <RequiredFieldLabel labelText={"Email"} />
            <input
              value={basicInfo.email}
              onChange={handleChange}
              placeholder="shane@gmail.com"
              type="email"
              name="email"
              className="bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 "
            />
          </label>
          <label>
            <RequiredFieldLabel labelText={"Age"} />
            <input
              name="age"
              type="text"
              placeholder="40"
              value={basicInfo.age}
              onChange={handleChange}
              className=" bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 "
            />
          </label>
          <div className="relative inline-block w-full">
            <RequiredFieldLabel labelText={"Gender"} />

            <select
              id="gender"
              name="gender"
              value={basicInfo.gender}
              onChange={handleChange}
              className={`mt-1 w-full p-1.5 border border-gray-400  outline-none focus:border-gray-700 rounded-md bg-transparent cursor-pointer ${
                basicInfo.gender == "" ? "text-[#a9a9a9]" : "text-black"
              }`}
            >
              <option value="" disabled className="">
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
            <RequiredFieldLabel labelText={"State"} />
            <input
              name="state"
              type="text"
              placeholder="London"
              value={basicInfo.state}
              onChange={handleChange}
              className=" bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 "
            />
          </label>
          <label className="flex flex-col ">
            <RequiredFieldLabel labelText={"Bio"} />
            <textarea
              name="bio"
              value={basicInfo.bio}
              onChange={handleChange}
              placeholder="Hello, I like to watch football."
              rows={5}
              className="bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 "
            ></textarea>
          </label>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="ml-auto mt-4 bg-fr-blue-200 w-1/3 md:w-1/5  text-white p-1.5 rounded hover:opacity-90"
        >
          {currentUser?.profileComplete ? "Update" : "Continue"}
        </button>
      </form>
    </div>
  );
}

export default BasicInfo;
