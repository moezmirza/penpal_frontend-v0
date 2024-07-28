import React, { useEffect, useRef, useState } from "react";
import { RequiredFieldLabel } from "../../components/mainComponents/RequiredFieldLabel";
import { MultiSelectField } from "../../components/mainComponents/MultiSelectField";
import { InputField } from "../../components/mainComponents/InputField";
import {
  basicInfoFieldLabelMap,
  basicInfoFieldDropdownOptions,
  basicInfoOptionsField,
  basicInfoPlaceholderMap,
  basicInfoReqFieldMap,
  fieldOptionMap,
  fieldStateNameMap,
  addonNameToStateMap,
  addonStateToNameMap,
  addonStatetoCost,
  stateFieldNameMap,
} from "../../utils/sharedState";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../services/firebase";
import { useSelector } from "react-redux";
import { usePost } from "../../api/usePost";
import { useGet } from "../../api/useGet";
import { useParams } from "react-router-dom";
import { usePut } from "../../api/usePut";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { compose, isAllOf } from "@reduxjs/toolkit";
import { v4, validate } from "uuid";
import { formattedImageName } from "../User/Profile/BasicInfo";
import ConfrimPopup from "../../components/ConfrimPopup";

function CreateCustomer() {
  const imageRef = useRef();
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPop, setShowConfirmPop] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const post = usePost();
  const get = useGet();
  const put = usePut();
  const { id } = useParams();

  const basicInfoIntialState = {
    firstName: "",
    lastName: "",
    inmateNumber: "",
    age: "",
    gender: "",
    orientation: "",
    state: [],
    city: "",
    mailingAddress: "",
    zipcode: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    hairColor: [],
    eyeColor: [],
    race: [],
    spokenLanguages: "",
    institutionalEmailProvider: [],
    religiousPref: [],
    highSchool: "",
    highSchoolState: "",
    highSchoolCity: "",
    education: [],
    collegeName: "",
    collegeState: "",
    collegeCity: "",
    homeTownCity: "",
    homeTownState: "",
    bodyType: [],
    astrologicalSign: [],
    relationShipStatus: [],
    veteranStatus: [],
    bio: "",
    imageUrl: "",
  };

  const personalityInfoInitialState = {
    hobbies: [],
    sports: [],
    likes: [],
    personality: [],
    bookGenres: [],
    musicGenres: [],
    movieGenres: [],
  };
  const dueInitiallState = {
    basicInfo: {
      firstName: false,
      lastName: false,
      email: false,
      inmateNumber: false,
      age: false,
      gender: false,
      orientation: false,
      state: false,
      city: false,
      mailingAddress: false,
      zipcode: false,
      dateOfBirth: false,
      height: false,
      weight: false,
      hairColor: false,
      eyeColor: false,
      race: false,
      spokenLanguages: false,
      institutionalEmailProvider: false,
      religiousPref: false,
      highSchool: false,
      highSchoolState: false,
      highSchoolCity: false,
      education: false,
      collegeName: false,
      collegeState: false,
      collegeCity: false,
      homeTownCity: false,
      homeTownState: false,
      bodyType: false,
      astrologicalSign: false,
      relationShipStatus: false,
      veteranStatus: false,
      bio: false,
      imageUrl: false,
    },
    personalityInfo: {
      hobbies: false,
      sports: false,
      likes: false,
      personality: false,
      bookGenres: false,
      musicGenres: false,
      movieGenres: false,
    },
    creation: false,
    renewal: false,
    featurePlacement: false,
    premiumPlacement: false,
    photo: false,
    wordLimit: false,
  };

  const [basicInfo, setBasicInfo] = useState(basicInfoIntialState);
  const [personalityInfo, setPersonalityInfo] = useState(
    personalityInfoInitialState
  );

  const [duesInfo, setDuesInfo] = useState(dueInitiallState);
  const [wordLimit, setWordLimit] = useState(false);
  const [imageDropdown, setImageDropdown] = useState(false);
  const [done, setDone] = useState(false);
  const payementBoxRef = useRef();
  // const validateEmail = (email) => {
  //   // Basic regex for email validation
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return regex.test(email);
  // };

  // to keep track of only updatedFields
  const updatedFields = useRef({});

  const handleUpdate = async (e) => {
    // checking for required fields
    setLoading(true);
    setShowConfirmPop(false);
    updatedFields.current = {};
    e.target.disabled = true;
    e.target.style.opacity = 0.5;

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
          console.log("using old image name");
          imageName = formattedImageName(prevName);
        }
      }
      const userProfileImgRef = ref(storage, `images/${imageName}`);
      const snapshot = await uploadBytes(userProfileImgRef, uploadedImg);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      console.log("downloadUrl", downloadUrl);
      basicInfo.imageUrl = downloadUrl;
    }

    const updatedInfo = Object.keys(updatedFields.current).reduce(
      (acc, field) => {
        acc[field] = basicInfo[field];
        return acc;
      },
      {}
    );

    console.log("updatedInfo", updatedInfo);

    if (id) {
      const finalObj = {
        ...updatedInfo,
      };
      if (updatedFields.current?.personalityInfo == true) {
        console.log("personality changed", personalityInfo);
        finalObj.personalityInfo = personalityInfo;
      }
      console.log("finalObjetct", finalObj);
      const { success, data, error } = await put(
        `/customer?id=${id}`,
        finalObj
      );
      if (success) {
        setLoading(false);
        setSuccess(true);
        setDone(true);
        console.log("data", data);
      } else {
        setLoading(false);
        setError("An unexpected error occurred");
      }
    } else {
      const finalObj = {
        ...basicInfo,
        personality: {
          ...personalityInfo,
        },
      };
      const { success, data, error } = await post("/customer", finalObj);
      if (success) {
        setLoading(false);
        setSuccess(true);
        setDone(true);
        setDuesInfo({ ...duesInfo, creation: true });
        console.log("data", data);
      } else {
        setLoading(false);
        setError(error);
      }
    }

    payementBoxRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleImageChange = () => {
    const files = imageRef.current.files;
    updatedFields.current["imageUrl"] = true;
    setDuesInfo({ ...duesInfo, photo: true });

    if (files.length > 0) {
      const src = URL.createObjectURL(files[0]);
      const preview = document.getElementById("avatar-preview");
      preview.src = src;
    }
  };

  const handleRemoveImage = () => {
    const files = imageRef.current.files;
    if (basicInfo.imageUrl != "") {
      updatedFields.current["imageUrl"] = true;
      if (id) {
        setDuesInfo({ ...duesInfo, photo: true });
      }
    }

    const preview = document.getElementById("avatar-preview");
    preview.src = "/assets/default.jpg";
    setImageDropdown(false);
  };
  const isEmpty = (key) => {
    if (typeof key === "string" && key == "") return true;
    else if (key.length == 0) return true;
    return false;
  };

  const roundTo = (num, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
  };
  const handleBasicInfoOptionsFieldChange = (label, value, remove) => {
    const fieldKeyIndex = Object.values(basicInfoFieldLabelMap).indexOf(label);
    const fieldKey = Object.keys(basicInfoFieldLabelMap)[fieldKeyIndex];
    console.log("field key", fieldKey);
    let updatedArr = basicInfo[fieldKey];
    console.log("updated arr", updatedArr);
    updatedFields.current[fieldKey] = true;
    if (id) {
      setDuesInfo({
        ...duesInfo,
        basicInfo: { ...duesInfo["basicInfo"], [fieldKey]: true },
      });
    }
    if (remove) {
      updatedArr = updatedArr.filter((item) => item != value);
    } else {
      console.log("qasim in else", fieldKey);
      if (fieldKey == "spokenLanguages") {
        updatedArr = [...updatedArr, value];
      } else {
        console.log("qasim not spoken lanagues");
        updatedArr = [value];
        console.log("qasim updated arr", updatedArr);
      }
    }
    const newObj = { ...basicInfo, [fieldKey]: updatedArr };
    console.log("updated object", newObj);
    setBasicInfo(newObj);
  };

  const handleBasicInfoTextFieldChange = (e) => {
    const fieldName = e.target.name;
    if (id) {
      setDuesInfo({
        ...duesInfo,
        basicInfo: { ...duesInfo["basicInfo"], [fieldName]: true },
      });
    }

    if (fieldName == "bio") {
      const text = e.target.value;
      let wordCount = text.split(" ").length;
      if (wordCount > 350) {
        setWordLimit(true);
        setDuesInfo({ ...duesInfo, wordLimit: true });
      } else {
        setWordLimit(false);
        setDuesInfo({ ...duesInfo, wordLimit: false });
      }
    }
    updatedFields.current[e.target.name] = true;
    setBasicInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePersonalityInfoChange = (label, value, remove) => {
    const stateKey = fieldStateNameMap[label];
    let updatedArr = personalityInfo[stateKey];
    updatedFields.current["personalityInfo"] = true;
    if (id) {
      setDuesInfo({
        ...duesInfo,
        personalityInfo: { ...duesInfo["personalityInfo"], [stateKey]: true },
      });
    }
    if (remove) {
      updatedArr = updatedArr.filter((item) => item != value);
    } else {
      updatedArr = [...updatedArr, value];
    }
    setPersonalityInfo({
      ...personalityInfo,
      [stateKey]: updatedArr,
    });
  };

  const handleClick = () => {
    imageRef.current.click();
    setImageDropdown(false);
  };

  const emptyFormat = (field) => {
    if (typeof basicInfo[field] == "string") return "";
    else return [];
  };

  useEffect(() => {
    console.log("customer id", id);
    const fetchCustomer = async () => {
      setLoading(true);

      const { success, data, error } = await get(`/customer?id=${id}`);
      console.log("success", success);
      if (success) {
        console.log("fetched Customer", data);
        for (const key in data) {
          if (
            key != "personality" &&
            key != "spokenLanguages" &&
            basicInfoOptionsField.includes(key)
          ) {
            console.log("conerting to array");
            data[key] = data[key] != "" ? [data[key]] : []; // converting to array
          }
        }

        data.dateOfBirth = data.dateOfBirth.split("T")[0];

        const personality = data["personality"];
        delete data["personality"];

        const basicInfoData = {};

        // assigning only state values
        Object.keys(basicInfo).forEach((field) => {
          basicInfoData[field] = data[field] ? data[field] : emptyFormat(field);
        });

        console.log("updated Data", data, "basicInfoDtaa", basicInfoData);
        setLoading(false);
        setBasicInfo(basicInfoData);
        setPersonalityInfo(personality);
      } else {
        setLoading(false);
        console.log("error", error);
      }
    };
    if (id) {
      console.log("inside here");
      fetchCustomer();
    } else {
      resetState();
    }
  }, [id]);

  const resetState = () => {
    setBasicInfo(basicInfoIntialState);
    setPersonalityInfo(personalityInfoInitialState);
    setDuesInfo(dueInitiallState);
    setDone(false);
    setSuccess(false);
    updatedFields.current={}
  };

  const handleSubmitBtn = () => {
    setError(false);
    setSuccess(false);
    setDone(false);
    for (const key in basicInfo) {
      if (
        basicInfoReqFieldMap[key] &&
        isEmpty(basicInfo[key]) &&
        key != "imageUrl"
      ) {
        setError("Fillout all the required fields");
        return;
      }
    }

    console.log("new personalityInfo", personalityInfo);
    for (const key in personalityInfo) {
      if (isEmpty(personalityInfo[key])) {
        setError("Fillout all the required fields");
        return;
      }
    }

    // if (!validateEmail(basicInfo.email)) {
    //   setError("Invalid email format");
    //   return;
    // }
    setShowConfirmPop(true);
  };

  let total = Object.keys(duesInfo).reduce((acc, curr) => {
    if (curr === "basicInfo" || curr === "personalityInfo") {
      const nestedTotal = Object.keys(duesInfo[curr]).reduce(
        (nestedAcc, field) => {
          return duesInfo[curr][field] ? nestedAcc + 9.95 : nestedAcc;
        },
        0
      );
      return acc + nestedTotal;
    }
    return duesInfo[curr] ? acc + addonStatetoCost[curr] : acc;
  }, 0);
  total = roundTo(total, 2);

  const changeOccured = Object.keys(updatedFields.current).length != 0;
  const bioWordsLenght =
    basicInfo.bio == "" ? 0 : basicInfo.bio.split(" ").length;
  return (
    <div className="bg-c-basic flex flex-col items-center gap-y-6 py-8 px-3  md:p-12">
      {/* <h1 className="text-4xl font-bold text-left underline">
        Customer Profile
      </h1> */}
      <div className="flex w-full flex-col md:flex-row gap-12">
        <div className="basis-[60%] bg-white rounded-lg">
          <div className="bg-gray-300 w-full rounded-lg p-6 flex flex-col items-center gap-y-6">
            <div className="w-fit m-auto relative">
              <img
                className="rounded-full md:w-52 md:h-52 w-36 h-36 object-cover object-top"
                src={basicInfo?.imageUrl || "/assets/default.jpg"}
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
              <div className="absolute md:bottom-2 md:right-2 bottom-4 right-1  z-20">
                <button
                  className="bg-white p-1.5 rounded-full"
                  onClick={() => setImageDropdown(!imageDropdown)}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="auth"
                    className="md:h-6 h-3"
                  />
                </button>
                {imageDropdown && (
                  <div className="absolute bg-white rounded-lg">
                    <button
                      onClick={handleClick}
                      className="border-b-2 px-2 py-1 md:px-4 md:py-2  "
                    >
                      Update
                    </button>
                    <button
                      onClick={handleRemoveImage}
                      className="border-b-2  px-2 py-1 md:px-4 md:py-2  "
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-600 italic text-sm md:text-base">
              *Click pencil to update/remove photo
            </p>
          </div>

          <div className="flex flex-col gap-y-6 text-sm  p-2 md:p-6 md:text-base">
            {id && (
              <p className="text-red-500 text-center">
                *Each field update will cost $9.95
              </p>
            )}
            <div className="m-auto font-semibold text-xl md:text-3xl underline">
              Basic Info
            </div>
            <div className="flex flex-col gap-y-4">
              {Object.keys(basicInfo).map((field) =>
                basicInfoOptionsField.includes(field) ? (
                  <MultiSelectField
                    key={field}
                    labelText={basicInfoFieldLabelMap[field]}
                    placeholderText={basicInfoFieldDropdownOptions[field][0]}
                    dropdownOptions={basicInfoFieldDropdownOptions[field]}
                    selectedOptions={basicInfo[field]}
                    onChange={handleBasicInfoOptionsFieldChange}
                    required={basicInfoReqFieldMap[field]}
                  />
                ) : field == "bio" ? (
                  <label key={field}>
                    <div className="flex gap-x-2 items-center">
                      <RequiredFieldLabel
                        labelText={basicInfoFieldLabelMap[field]}
                      />
                    </div>
                    <textarea
                      name="bio"
                      value={basicInfo[field]}
                      onChange={handleBasicInfoTextFieldChange}
                      placeholder={
                        "Please type your desired profile statement in the bio box below (only 350 words are included FREE, its $9.95 for each additional 100 words over 350)"
                      }
                      rows={5}
                      className={`bg-transparent block w-full my-1.5 rounded-md p-1.5 border  ${
                        wordLimit
                          ? "focus:border-red-500 border-red-500"
                          : " focus:border-gray-700 border-gray-400"
                      } outline-none`}
                    ></textarea>
                    {wordLimit && (
                      <p className="text-red-500 text-xs md:text-sm">
                        free limit of 350 words exceeded, you'll have to pay
                        $9.95 for each extra 100 words.
                      </p>
                    )}
                    <p className="text-gray-600 text-xs md:text-sm italic ">
                      Word Count: {bioWordsLenght}
                    </p>
                  </label>
                ) : (
                  field != "imageUrl" && (
                    <InputField
                      key={field}
                      labelText={basicInfoFieldLabelMap[field]}
                      type={field === "dateOfBirth" ? "date" : "text"}
                      placeholder={basicInfoPlaceholderMap[field]}
                      name={field}
                      value={basicInfo[field]}
                      onChange={handleBasicInfoTextFieldChange}
                      required={basicInfoReqFieldMap[field]}
                    />
                  )
                )
              )}
            </div>
          </div>

          {/* personality info */}
          <div
            id="card"
            className="bg-white flex flex-col py-6 gap-y-6 md:gap-y-8 pb-10 items-center p-3 md:p-6 lg mb-6 relative"
          >
            {id && (
              <p className="text-red-500 text-center">
                *Each field update will cost $9.95
              </p>
            )}
            <div className="m-auto font-semibold text-xl md:text-3xl underline">
              Personality Info
            </div>
            {showConfirmPop && (
              <ConfrimPopup
                infoText={`It will cost a total of $${total}
                `}
                continueBtnTxt={"Continue editing"}
                confirmBtnTxt={`Confirm ${id ? "updation" : "creation"}`}
                onConfirm={handleUpdate}
                onCloseClick={setShowConfirmPop}
                width="3/5"
              />
            )}

            {Object.keys(fieldOptionMap).map((key) => (
              <MultiSelectField
                key={key}
                labelText={key}
                placeholderText={fieldOptionMap[key][0]}
                dropdownOptions={fieldOptionMap[key]}
                selectedOptions={personalityInfo[fieldStateNameMap[key]]}
                onChange={handlePersonalityInfoChange}
                required={true}
              />
            ))}
            <div className="flex gap-x-6 w-full justify-between">
              {success && (
                <p className="text-green-500 w-fit text-sm md:text-base">
                  Customer {id ? "updated" : "created"} successfully
                </p>
              )}
              {error && (
                <p className="text-fr-red w-fit text-sm md:text-base">
                  {error}
                </p>
              )}

              <button
                className={`ml-auto  bg-fr-blue-200 w-1/3 md:w-1/5  text-white p-1.5 rounded ${
                  !changeOccured
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-90"
                }`}
                onClick={handleSubmitBtn}
                disabled={!changeOccured}
              >
                {id
                  ? loading
                    ? "Updating..."
                    : "Update"
                  : loading
                  ? "Creating..."
                  : "Create"}{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="basis-[40%] flex flex-col gap-y-6">
          <DuesSection
            duesInfo={duesInfo}
            total={total}
            isDone={done}
            id={id}
            payementBoxRef={payementBoxRef}
            changeOccured={changeOccured}
          />
          <AddOns onClick={setDuesInfo} />
        </div>
      </div>
    </div>
  );
}

function AddOns({ onClick }) {
  const addonsList = [
    "Profile Renewal",
    "Feature Placement",
    "Premium Placement",
  ];
  const addonCostMap = {
    "Profile Renewal": "$79.95",
    "Feature Placement": "$14.95",
    "Premium Placement": "$24.95",
  };

  const handleChange = (addon) => {
    const stateField = addonNameToStateMap[addon];
    onClick((prev) => ({ ...prev, [stateField]: !prev[stateField] }));
  };
  return (
    <div className=" bg-white rounded-lg h-fit  px-6 md:px-12 py-6  border">
      <h1 className="text-2xl  font-bold text-center">Add-ons</h1>

      <div className="flex flex-col mt-6 gap-y-6 ">
        {addonsList.map((addon) => (
          <label class="w-full  flex items-center gap-x-3 cursor-pointer">
            <input
              type="checkbox"
              onChange={() => handleChange(addon)}
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <div className="flex justify-between w-full">
              <p>{addon}</p>
              <p>{addonCostMap[addon]}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function DuesSection({
  duesInfo,
  total,
  isDone,
  id,
  payementBoxRef,
  changeOccured,
}) {
  console.log("duesInfo", duesInfo);

  console.log("isDone", isDone, "changeOccured", changeOccured);
  return (
    <div
      ref={payementBoxRef}
      className=" bg-white rounded-lg h-fit px-6 md:px-12 py-6 flex flex-col gap-y-6 border"
    >
      <h1 className="text-2xl  font-bold text-center">Total Dues</h1>
      <div className="flex flex-col gap-y-4">
        {Object.keys(duesInfo)?.map((due) =>
          due == "basicInfo"
            ? Object.keys(duesInfo["basicInfo"]).map(
                (field) =>
                  duesInfo["basicInfo"][field] && (
                    <div className="flex justify-between">
                      <p>{basicInfoFieldLabelMap[field]}</p>
                      <p>$9.95</p>
                    </div>
                  )
              )
            : due == "personalityInfo"
            ? Object.keys(duesInfo["personalityInfo"]).map(
                (field) =>
                  duesInfo["personalityInfo"][field] && (
                    <div className="flex justify-between">
                      <p>{stateFieldNameMap[field]}</p>
                      <p>$9.95</p>
                    </div>
                  )
              )
            : duesInfo[due] && (
                <div className="flex justify-between">
                  <p>{addonStateToNameMap[due]}</p>
                  <p>${addonStatetoCost[due]}</p>
                </div>
              )
        )}
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <p>${total}</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 text-white">
        <button
          className={`py-2 w-full bg-green-600 rounded-lg ${
            isDone && !changeOccured
              ? "curose-pointer"
              : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!isDone || changeOccured}
        >
          Pay now
        </button>
        {!isDone ||
          (changeOccured && (
            <p className="text-red-500 italic text-center">
              {`*First ${id ? "update" : "create"} your profile to pay`}
            </p>
          ))}
        {/* <button className="py-2 w-full bg-red-600 rounded-lg ">
          Pay later
        </button> */}
      </div>
    </div>
  );
}

export default CreateCustomer;
