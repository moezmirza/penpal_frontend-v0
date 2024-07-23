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
} from "../../utils/sharedState";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../services/firebase";
import { useSelector } from "react-redux";
import { usePost } from "../../api/usePost";
import { useGet } from "../../api/useGet";
import { useParams } from "react-router-dom";
import { usePut } from "../../api/usePut";
import { LoadingSpinner } from "../../components/LoadingSpinner";

function CreateCustomer() {
  const imageRef = useRef();
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const post = usePost();
  const get = useGet();
  const put = usePut();
  const { id } = useParams();

  const [basicInfo, setBasicInfo] = useState({
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
    education: [],
    nameOfCollege: "",
    bodyType: [],
    astrologicalSign: [],
    relationShipStatus: [],
    veteranStatus: [],
    bio: "",
    imageUrl: "",
  });
  const [personalityInfo, setPersonalityInfo] = useState({
    hobbies: [],
    sports: [],
    likes: [],
    personality: [],
    bookGenres: [],
    musicGenres: [],
    movieGenres: [],
  });

  const handleUpdate = async () => {
    // checking for required fields
    setError("");
    setSuccess(false);

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

    for (const key in personalityInfo) {
      if (isEmpty(key)) {
        setError("Fillout all the required fields");
        return;
      }
    }

    setLoading(true);
    const uploadedImg = imageRef.current.files[0];
    if (uploadedImg) {
      console.log("uploading img...", uploadedImg);
      const userProfileImgRef = ref(
        storage,
        `images/${currentUser.firebaseUid}`
      );
      const snapshot = await uploadBytes(userProfileImgRef, uploadedImg);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      basicInfo.imageUrl = downloadUrl;
    }
    console.log("final Object", { ...basicInfo, ...personalityInfo });
    const finalObj = {
      ...basicInfo,
      personality: {
        ...personalityInfo,
      },
    };
    console.log("finalObj", finalObj);

    if (id) {
      const { success, data, error } = await put(
        `/customer?id=${id}`,
        finalObj
      );
      if (success) {
        setLoading(false);
        setSuccess(true);
        console.log("data", data);
      } else {
        setLoading(false);
        setError("An unexpected error occurred");
      }
    } else {
      const { success, data, error } = await post("/customer", finalObj);
      if (success) {
        setLoading(false);
        setSuccess(true);
        console.log("data", data);
      } else {
        setLoading(false);
        setError("An unexpected error occurred");
      }
    }
  };

  const handleImageChange = () => {
    const files = imageRef.current.files;

    if (files.length > 0) {
      const src = URL.createObjectURL(files[0]);
      const preview = document.getElementById("avatar-preview");
      preview.src = src;
    }
  };
  const isEmpty = (key) => {
    if (typeof key === "string" && key == "") return true;
    else if (key.length == 0) return true;
    return false;
  };

  const handleBasicInfoOptionsFieldChange = (label, value, remove) => {
    const fieldKeyIndex = Object.values(basicInfoFieldLabelMap).indexOf(label);
    const fieldKey = Object.keys(basicInfoFieldLabelMap)[fieldKeyIndex];
    let updatedArr = basicInfo[fieldKey];

    if (remove) {
      updatedArr = updatedArr.filter((item) => item != value);
    } else {
      if (fieldKey == "spokenLanguages") {
        updatedArr = [...updatedArr, value];
      } else {
        updatedArr = [value];
      }
    }
    setBasicInfo((prev) => ({ ...prev, [fieldKey]: updatedArr }));
  };

  const handleBasicInfoTextFieldChange = (e) => {
    setBasicInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePersonalityInfoChange = (label, value, remove) => {
    const stateKey = fieldStateNameMap[label];
    let updatedArr = personalityInfo[stateKey];
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
    console.log(imageRef.current.click());
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
        setLoading(false);
        for (const key in data) {
          if (
            key != "personality" &&
            key != "spokenLanguages" &&
            basicInfoOptionsField.includes(key)
          ) {
            console.log("conerting to array");
            data[key] = [data[key]]; // converting to array
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
    }
  }, []);
  return (
    <div className="bg-c-basic flex flex-col items-center gap-y-6 py-8 px-3  md:p-12">
      <h1 className="text-3xl font-bold   md:w-7/12 text-left underline">
        Customer Profile
      </h1>
      <div className=" w-full md:w-7/12 bg-white">
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

        <div className="flex flex-col gap-y-6 text-sm  p-2 md:p-6 md:text-base">
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
                  <RequiredFieldLabel
                    labelText={basicInfoFieldLabelMap[field]}
                  />
                  <textarea
                    name="bio"
                    value={basicInfo[field]}
                    onChange={handleBasicInfoTextFieldChange}
                    placeholder={basicInfoPlaceholderMap[field]}
                    rows={5}
                    className="bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 "
                  ></textarea>
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
          className="bg-white flex flex-col py-6 gap-y-6 md:gap-y-8 pb-10 items-center p-3 md:p-6 lg mb-6"
        >
          <div className="m-auto font-semibold text-xl md:text-3xl underline">
            Personality Info
          </div>

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
              <p className="text-fr-red w-fit text-sm md:text-base">{error}</p>
            )}

            <button
              className="ml-auto  bg-fr-blue-200 w-1/3 md:w-1/5  text-white p-1.5 rounded hover:opacity-90"
              onClick={handleUpdate}
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
    </div>
  );
}

export default CreateCustomer;
