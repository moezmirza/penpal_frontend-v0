import React, { useEffect, useRef, useState } from "react";
import { MultiSelectField } from "../../../components/mainComponents/MultiSelectField";
import { useDispatch, useSelector } from "react-redux";
import mapAuthCodeToMessage from "../../../utils/authCodeMap";
import { usePut } from "../../../api/usePut";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { setUserPersonality } from "../../../state/slices/userPersonalitySlice";
import { useGet } from "../../../api/useGet";
import { useNavigate } from "react-router-dom";
import { setCurrentUserProfileStatus } from "../../../state/slices/userSlice";
import { fieldOptionMap, fieldStateNameMap } from "../../../utils/sharedState";

function Questionairre() {
  const personalityInfoState = useSelector(
    (state) => state.userPersonality.info
  );
  const currentUser = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const get = useGet();
  const put = usePut();
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
    setError("");
    console.log(personalityInfo);
    for (const key in personalityInfo) {
      if (personalityInfo[key].length === 0) {
        setError("All fields are required!");
        return;
      }
    }
    setLoading(true);
    const { success, data, error } = await put("/user/personality", {
      personality: personalityInfo,
    });
    if (success) {
      console.log("personality data", data);
      dispatch(setUserPersonality(data.personality));
      dispatch(setCurrentUserProfileStatus(true));
      if (!currentUser.profileComplete) {
        navigate("/#findpal");
      }
      setDone(true);
    } else {
      console.log(error);
      setError(mapAuthCodeToMessage(error));
    }
    setLoading(false);
  };

  const handleChange = (key, value, remove) => {
    const stateKey = fieldStateNameMap[key];
    let updatedArr = personalityInfo[stateKey];
    console.log("updatedArr", updatedArr);
    if (remove) {
      updatedArr = updatedArr.filter((item) => item != value);
    } else {
      console.log("UpdatedArr", updatedArr, "value", value);
      updatedArr = [...updatedArr, value];
    }
    setPersonalityInfo({
      ...personalityInfo,
      [stateKey]: updatedArr,
    });
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const fetchPersonalityInfo = async () => {
      setLoading(true);
      const { success, data, error } = await get("/user/personality");
      if (success) {
        console.log(data);
        setPersonalityInfo(data);
        dispatch(setUserPersonality(data));
      } else {
        setError(mapAuthCodeToMessage(error));
      }
      setLoading(false);
    };
    console.log("personaityInfoState", personalityInfoState);
    if (personalityInfoState == null) {
      fetchPersonalityInfo();
    } else {
      setPersonalityInfo(personalityInfoState);
    }
  }, []);

  return (
    <div
      id="card"
      className="bg-white flex flex-col py-6 gap-y-6 md:gap-y-8 pb-10 items-center m-auto rounded-lg mb-6 p-2 md:p-6 relative"
    >
      <div className="m-auto font-semibold text-xl md:text-2xl">Edit Info</div>
      {error && <p className="text-red-500 mt-1"> {error} </p>}
      <LoadingSpinner isLoading={loading} isDone={done} />

      {Object.keys(fieldOptionMap).map((key) => (
        <MultiSelectField
          key={key}
          labelText={key}
          placeholderText={fieldOptionMap[key][0]}
          dropdownOptions={fieldOptionMap[key]}
          selectedOptions={personalityInfo[fieldStateNameMap[key]]}
          onChange={handleChange}
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

export default Questionairre;
