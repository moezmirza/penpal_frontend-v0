import React, { useEffect, useRef, useState } from "react";
import { RequiredFieldLabel } from "../../components/mainComponents/RequiredFieldLabel";
import { MultiSelectField } from "../../components/mainComponents/MultiSelectField";
import {
  bookGenres,
  hobbies,
  likes,
  movieGenres,
  musicGenres,
  personality,
  sports,
} from "./personalityInfoOptions";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../api/get";
import mapAuthCodeToMessage from "../../utils/authCodeMap";
import { put } from "../../api/put";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { setUserPersonality } from "../../state/slices/userPersonalitySlice";

function PersonalityInfo() {
  const personalityInfoState = useSelector(
    (state) => state.userPersonality.info
  );
  const authToken = useSelector((state) => state.auth.token);
  const customSelectContainerRef = useRef(null);
  const [collapseDropdown, setCollapseDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [personalityInfo, setPersonalityInfo] = useState({
    hobbies: [],
    sports: [],
    likes: [],
    personality: [],
    bookGenres: [],
    musicGenres: [],
    movieGenres: [],
  });

  const fieldOptionMap = {
    Hobbies: hobbies,
    Sports: sports,
    Likes: likes,
    Personality: personality,
    BookGenres: bookGenres,
    MusicGenres: musicGenres,
    MovieGenres: movieGenres,
  };

  const fieldStateNameMap = {
    Hobbies: "hobbies",
    Sports: "sports",
    Likes: "likes",
    Personality: "personality",
    BookGenres: "bookGenres",
    MusicGenres: "musicGenres",
    MovieGenres: "movieGenres",
  };

  const handleUpdate = async () => {
    setError("");
    console.log(personalityInfo);
    for (const key in personalityInfo) {
      if (personalityInfo[key].length === 0) {
        setError("All fields are required!");
        return;
      }
    }
    setLoading(true);
    const { success, data, error } = await put(
      "/user/personality",
      { personality: personalityInfo },
      authToken
    );
    setLoading(false);
    if (success) {
      console.log(data);

      dispatch(setUserPersonality(data.personality));
    } else {
      console.log(error);
      setLoading(false);
      setError(mapAuthCodeToMessage(error));
    }
  };

  const handleChange = (key, value, remove) => {
    const stateKey = fieldStateNameMap[key];
    let updatedArr = personalityInfo[stateKey];
    console.log("updatedArr", updatedArr);
    if (remove) {
      updatedArr = updatedArr.filter((item) => item != value);
    } else {
      console.log("UpdatedArr", updatedArr, "value", value)
      updatedArr=[...updatedArr, value]
    }
    setPersonalityInfo({
      ...personalityInfo,
      [stateKey]: updatedArr,
    });
  };
  const handleClickOutside = (e) => {
    console.log(e.target.id, "target");
    console.log(customSelectContainerRef.current.contains(e.target));

    if (
      customSelectContainerRef.current &&
      !customSelectContainerRef.current.contains(e.target)
    ) {
      console.log("inside here yellow ");
      setCollapseDropdown(true);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchPersonalityInfo = async () => {
      setLoading(true);
      if (authToken) {
        const { success, data, error } = await get(
          "/user/personality",
          authToken
        );
        if (success) {
          console.log(data);
          setPersonalityInfo(data);
          dispatch(setUserPersonality(data));
        } else {
          setError(mapAuthCodeToMessage(error));
        }
        setLoading(false);
      }
    };
    console.log("personaityInfoState", personalityInfoState);
    if (personalityInfoState == null) {
      fetchPersonalityInfo();
    } else {
      setPersonalityInfo(personalityInfoState);
    }
  }, []);

  useEffect(() => {
    if (collapseDropdown) {
      setCollapseDropdown(false);
    }
  }, [collapseDropdown]);
  return (
    <div
      ref={customSelectContainerRef}
      id="card"
      className="bg-white flex flex-col py-6 gap-y-6 md:gap-y-8 pb-10 items-center m-auto rounded-lg mb-6 p-2 md:p-6 relative"
    >
      <div className="m-auto font-semibold text-xl md:text-2xl">Edit Info</div>
      {error && <p className="text-red-500 mt-1"> {error} </p>}
      {loading && <LoadingSpinner />}

      {Object.keys(fieldOptionMap).map((key) => (
        <MultiSelectField
          key={key}
          labelText={key}
          placeholderText={fieldOptionMap[key][0]}
          dropdownOptions={fieldOptionMap[key]}
          selectedOptions={personalityInfo[fieldStateNameMap[key]]}
          onChange={handleChange}
          collapseDropdown={collapseDropdown}
        />
      ))}
      <button
        className="ml-auto  bg-fr-blue-200 w-1/3 md:w-1/5  text-white p-1.5 rounded hover:opacity-90"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
}

export default PersonalityInfo;
