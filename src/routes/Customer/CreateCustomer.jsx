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
import { useNavigate, useParams } from "react-router-dom";
import { usePut } from "../../api/usePut";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { v4, validate } from "uuid";
import { formattedImageName } from "../User/Profile/BasicInfo";
import ConfrimPopup, { PaymentReceipt } from "../../components/ConfrimPopup";
import { isEmpty, roundTo } from "../../utils/sharedMethods";

function CreateCustomer() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUpdateConfirmPop, setShowUpdateConfirmPop] = useState(false);
  const [showCreateConfirmPop, setShowCreateConfirmPop] = useState(false);
  const [createdCustomerId, setCreatedCustomerId] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  const post = usePost();
  const get = useGet();
  const put = usePut();
  const { id } = useParams();

  const dummyBasicInfo = {
    firstName: "John",
    lastName: "Doe",
    inmateNumber: "123456",
    age: "30",
    gender: "Male",
    orientation: "Straight",
    state: ["California"],
    city: "Los Angeles",
    mailingAddress: "1234 Main St",
    zipcode: "90001",
    dateOfBirth: "1993-01-01",
    height: "6'0\"",
    weight: "180 lbs",
    hairColor: ["Brown"],
    eyeColor: ["Blue"],
    race: ["Other"],
    spokenLanguages: "English",
    institutionalEmailProvider: ["example.com"],
    religiousPref: ["Christian"],
    highSchool: "Lincoln High",
    highSchoolState: "California",
    highSchoolCity: "Los Angeles",
    education: ["Bachelors degree"],
    collegeName: "University of California",
    collegeState: "California",
    collegeCity: "Los Angeles",
    homeTownCity: "San Francisco",
    homeTownState: "California",
    bodyType: [],
    astrologicalSign: [],
    relationShipStatus: ["Single"],
    veteranStatus: ["Army veteran"],
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };

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
  };

  const dummyPInfo = {
    hobbies: ["Reading"],
    sports: ["Basketball"],
    likes: ["Traveling"],
    personality: ["Outgoing"],
    bookGenres: ["Fiction"],
    musicGenres: ["Rock"],
    movieGenres: ["Action"],
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
    featuredPlacement: false,
    premiumPlacement: false,
    wordLimit: 0,
    totalPaidPhotos: 0,
  };
  const photosIntialState = {
    imageUrl: "",
    artworks: [],
    total: 0,
  };

  const [photos, setPhotos] = useState(photosIntialState);
  const [currPhotos, setCurrPhotos] = useState(photosIntialState);
  const [basicInfo, setBasicInfo] = useState(basicInfoIntialState);
  const [personalityInfo, setPersonalityInfo] = useState(
    personalityInfoInitialState
  );

  const [duesInfo, setDuesInfo] = useState(dueInitiallState);
  const [wordLimit, setWordLimit] = useState(false);
  const [wordNum, setWordNum] = useState(0);
  const [intialWordCount, setIntialWordCount] = useState(0);
  const [done, setDone] = useState(false);
  const payementBoxRef = useRef();
  const errorRef = useRef();
  const updateBtnRef = useRef();
  const navigate = useNavigate();

  const updatedFieldsInitialState = {
    basicInfo: {},
    personalityInfo: {},
  };
  const updatedFields = useRef(updatedFieldsInitialState); // to keep track of updatedFields
  // const validateEmail = (email) => {
  //   // Basic regex for email validation
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return regex.test(email);
  // };

  const uploadImage = async (imageFile, imageName, folder) => {
    try {
      const userProfileImgRef = ref(storage, `${folder}/${imageName}`);
      const snapshot = await uploadBytes(userProfileImgRef, imageFile);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch {
      console.log("error uploading image");
      return "";
    }
  };

  const uploadImages = async (images, folder) => {
    const uploadPromises = images.map((image, index) => {
      let imageName = formattedImageName(v4());
      return uploadImage(image, imageName, folder);
    });
    const downloadUrls = await Promise.all(uploadPromises);
    return downloadUrls;
  };
  const handleImageUpdate = async () => {
    //   // to handle image removal
    // if (currPhotos.imageUrl == "" && photos.imageUrl != "") {
    //   let prevName = photos.imageUrl.split("imageNameS")[1];
    //   prevName = prevName?.split("imageNameE")[0];
    //   if (prevName) {
    //     imageName = formattedImageName(prevName);
    //   }
    //   try {
    //     const deleteImageRef = ref(storage, `${"images"}/${imageName}`);
    //     await deleteObject(deleteImageRef);
    //   } catch {
    //     console.log("error while deleting");
    //   }
    // }
    let imageDownloadURL = "";
    let artworksDownloadURL = [];
    let total = currPhotos.total;
    console.log("currPhotos.total", total);

    if (currPhotos.imageUrl) {
      let imageName = formattedImageName(v4());
      // using the old image name
      if (photos.imageUrl != "") {
        let prevName = photos.imageUrl.split("imageNameS")[1];
        prevName = prevName?.split("imageNameE")[0];
        if (prevName) {
          imageName = formattedImageName(prevName);
        }
      }
      imageDownloadURL = await uploadImage(
        currPhotos.imageUrl,
        imageName,
        "images"
      );
      // console.log("imageDownloadURL", imageDownloadURL);
      // console.log("imageUrl.total", total);
    }
    if (currPhotos.artworks.length != 0) {
      artworksDownloadURL = await uploadImages(currPhotos.artworks, "artworks");
      console.log("imageDownloadUrls", artworksDownloadURL);

      console.log("imageDownloadUrls.total", total);
    }
    return { imageDownloadURL, artworksDownloadURL, total: currPhotos.total };
  };

  const handleUpdate = async (e) => {
    // checking for required fields
    setLoading(true);
    setShowUpdateConfirmPop(false);
    setShowCreateConfirmPop(false);

    const { imageDownloadURL, artworksDownloadURL, total } =
      await handleImageUpdate();
    updateBtnRef.current.disabled = true;

    if (id) {
      let updatedBasicInfo = Object.keys(
        updatedFields?.current?.basicInfo
      ).reduce((acc, item) => {
        acc[item] = basicInfo[item];
        return acc;
      }, {});

      let updatedPersonalityInfo = Object.keys(
        updatedFields?.current?.personalityInfo
      ).reduce((acc, item) => {
        acc[item] = personalityInfo[item];
        return acc;
      }, {});

      const finalObj = {
        photos: {
          imageUrl: imageDownloadURL,
          artworks: artworksDownloadURL,
          total: total,
        },
        basicInfo: updatedBasicInfo,
        personalityInfo: updatedPersonalityInfo,
        wordLimit: (wordLimit || 0) + (duesInfo.wordLimit || 0),
        totalPaidPhotos:
          (updatedFields.current.totalPaidPhotos || 0) +
          (duesInfo.totalPaidPhotos || 0),
      };
      console.log("finalObjetct to be putted", finalObj);

      const { success, data, error } = await put(
        `/customer?id=${id}`,
        finalObj
      );

      if (success) {
        setLoading(false);
        setDone(true);

        const pendingDues = updatedFields.current;

        // Ensure default values for addition
        const newPendingDues = {
          ...pendingDues,
          creation: duesInfo.creation,
          wordLimit: (pendingDues.wordLimit || 0) + (duesInfo.wordLimit || 0),
          totalPaidPhotos:
            (pendingDues.totalPaidPhotos || 0) +
            (duesInfo.totalPaidPhotos || 0),
        };

        console.log("pendingDues", newPendingDues);
        setDuesInfo(newPendingDues);
        updateBtnRef.current.disabled = false;
        payementBoxRef.current.scrollIntoView({
          behavior: "smooth",
        });
      } else {
        console.log("errorMsg", error, error?.message);

        setLoading(false);
        updateBtnRef.current.disabled = false;
        errorRef.current.scrollIntoView({
          behavior: "smooth",
        });
        if (error?.message == "update pending") {
          setError("Previous update had to approved to make a new one");
        } else {
          setError("An unexpected error occurred");
        }
      }
    } else {
      const finalObj = {
        photos: {
          imageUrl: imageDownloadURL,
          artworks: artworksDownloadURL,
          total: total,
        },
        basicInfo,
        personalityInfo: personalityInfo,
        wordLimit: wordLimit,
        totalPaidPhotos: total > 3 ? total - 3 : 0,
      };

      console.log(
        "finalObjetct",
        finalObj,
        "basicInfo",
        basicInfo,
        "personalitInfo",
        personalityInfo
      );

      const { success, data, error } = await post("/customer", finalObj);
      if (success) {
        console.log("customer created", data);
        setCreatedCustomerId(data._id);
        setLoading(false);
        setDone(true);

        console.log("duesInfo", duesInfo);
        setDuesInfo((prev) => ({
          ...prev,
          totalPaidPhotos: total > 3 ? total - 3 : 0,
        }));
        setDuesInfo((prev) => ({ ...prev, wordLimit: wordLimit }));
        setDuesInfo((prev) => ({ ...prev, creation: true }));
        payementBoxRef.current.scrollIntoView({
          behavior: "smooth",
        });
      } else {
        setLoading(false);
        setDuesInfo(dueInitiallState);
        setError("An expected error occured");
        updateBtnRef.current.disabled = false;
        errorRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  const handleBasicInfoOptionsFieldChange = (label, value, remove) => {
    const fieldKeyIndex = Object.values(basicInfoFieldLabelMap).indexOf(label);
    const fieldKey = Object.keys(basicInfoFieldLabelMap)[fieldKeyIndex];
    console.log("field key", fieldKey);
    let updatedArr = basicInfo[fieldKey];
    console.log("updated arr", updatedArr);
    updatedFields.current.basicInfo[fieldKey] = true;

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

    if (fieldName == "bio") {
      const text = e.target.value;
      let wordCount = text.split(" ").length;
      console.log("intialWordCount", intialWordCount);
      if (wordCount <= intialWordCount) {
        setWordLimit(0);
      }
      if (wordCount > 350) {
        console.log("wordCount", wordCount);

        if (wordCount > intialWordCount && intialWordCount >= 350) {
          let netWordCount = wordCount - intialWordCount;
          console.log("netWordCount", netWordCount);

          if (netWordCount > 100) {
            const totalCount = Math.floor(netWordCount / 100);
            console.log("totalCount", totalCount);
            setWordLimit(totalCount);
            // setWordNum(totalCount);
          }
        } else if (intialWordCount < 350) {
          let netWordCount = wordCount - 350;
          let totalCount = Math.floor(netWordCount / 100);
          setWordLimit(totalCount);
          // setWordNum(totalCount);
        }
      } else {
        setWordLimit(0);
      }
    }
    updatedFields.current.basicInfo[e.target.name] = true;
    setBasicInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePersonalityInfoChange = (label, value, remove) => {
    const stateKey = fieldStateNameMap[label];
    let updatedArr = personalityInfo[stateKey];

    updatedFields.current.personalityInfo[stateKey] = true;
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

  const basicInfoEmptyFormat = (field) => {
    if (typeof basicInfo[field] == "string") return "";
    else return [];
  };

  const duesInfoEmptyFormat = (field) => {
    if (typeof dueInitiallState[field] == "boolean") return false;
    else if (typeof dueInitiallState[field] == "number") return 0;
    else return {};
  };
  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);

      let { success, data, error } = await get(`/customer?id=${id}`);
      if (success) {
        console.log("fetched Customer", data);
        data = data[0];
        for (const key in data?.basicInfo) {
          if (key != "spokenLanguages" && basicInfoOptionsField.includes(key)) {
            console.log("conerting to array");
            data[key] = data[key] != "" ? [data[key]] : []; // converting to array
          }
        }

        data.basicInfo.dateOfBirth = data.basicInfo.dateOfBirth.split("T")[0];

        const fetchedPersonality = data["personalityInfo"];
        const fetchedBasicInfo = data["basicInfo"];
        const fetchedPhotos = data["photos"];
        const fetchedPendingDues = data["pendingPayments"];

        const basicInfoData = {};
        const duesInfoData = {};

        // assigning only state values
        Object.keys(basicInfo).forEach((field) => {
          basicInfoData[field] = fetchedBasicInfo[field]
            ? fetchedBasicInfo[field]
            : basicInfoEmptyFormat(field);
        });

        // assigning only state values
        Object.keys(duesInfo).forEach((field) => {
          duesInfoData[field] = fetchedPendingDues[field]
            ? fetchedPendingDues[field]
            : duesInfoEmptyFormat(field);
        });
        console.log("duesInfoData", duesInfoData);

        console.log(
          "fetchedPhotos",
          fetchedPhotos,
          "basicInfoDtaa",
          basicInfoData,
          "fetchedPersonality",
          fetchedPersonality
        );
        setLoading(false);
        setDone(true);
        setPhotos(fetchedPhotos);
        setBasicInfo(basicInfoData);
        setPersonalityInfo(fetchedPersonality);
        setDuesInfo(duesInfoData);
        const bioWordsLenght =
          basicInfoData?.bio == "" ? 0 : (basicInfoData?.bio.split(" ")).length;
        console.log("intialwordCount", bioWordsLenght);
        setIntialWordCount(bioWordsLenght);
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
    setPhotos(photosIntialState);
    setBasicInfo(basicInfoIntialState);
    setPersonalityInfo(personalityInfoInitialState);
    setDuesInfo(dueInitiallState);
    setDone(false);
    updatedFields.current = updatedFieldsInitialState;
  };
  const checkObjEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  const checkForChange = (obj) => {
    return (
      currPhotos.total == 0 &&
      checkObjEmpty(obj.basicInfo) &&
      checkObjEmpty(obj.personalityInfo)
    );
  };

  const handleSubmitBtn = () => {
    setError("");
    setDone(false);
    if (id) {
      //only for update

      if (checkForChange(updatedFields.current)) {
        setError("No changes made");
        return;
      }
    }

    for (const key in basicInfo) {
      if (basicInfoReqFieldMap[key] && isEmpty(basicInfo[key])) {
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

    if (id) {
      setShowUpdateConfirmPop(true);
    } else {
      setShowCreateConfirmPop(true);
    }
  };

  const handlePaynow = () => {
    if (id) {
      navigate("/payment", { state: { cid: id, paymentDetails: duesInfo } });
    } else {
      navigate("/payment", {
        state: { cid: createdCustomerId, paymentDetails: duesInfo },
      });
    }
  };

  const changeOccured = Object.keys(updatedFields.current).length != 0;
  console.log("changed Occured", changeOccured);

  return (
    <div className="bg-c-basic flex flex-col items-center gap-y-6 py-8 px-3  md:p-12 relative">
      {/* <h1 className="text-4xl font-bold text-left underline">
        Customer Profile
        </h1> */}
      <div className="flex w-full flex-col md:flex-row gap-12 relative">
        <LoadingSpinner isLoading={loading} bgShade="400" isDone={done} />
        <CustomerDetails
          id={id}
          basicInfo={basicInfo}
          personalityInfo={personalityInfo}
          handlePersonalityInfoChange={handlePersonalityInfoChange}
          handleBasicInfoOptionsFieldChange={handleBasicInfoOptionsFieldChange}
          handleBasicInfoTextFieldChange={handleBasicInfoTextFieldChange}
          error={error}
          done={done}
          handleSubmitBtn={handleSubmitBtn}
          changeOccured={changeOccured}
          wordLimit={wordLimit}
          loading={loading}
          showUpdateConfirmPop={showUpdateConfirmPop}
          handleUpdate={handleUpdate}
          setShowUpdateConfirmPop={setShowUpdateConfirmPop}
          duesInfo={duesInfo}
          showCreateConfirmPop={showCreateConfirmPop}
          setShowCreateConfirmPop={setShowCreateConfirmPop}
          updatedFields={updatedFields}
          photos={photos}
          setPhotos={setPhotos}
          setCurrPhotos={setCurrPhotos}
          currPhotos={currPhotos}
          errorRef={errorRef}
          updateBtnRef={updateBtnRef}
        />
        <div className="basis-[40%] flex flex-col gap-y-6">
          <DuesSection
            duesInfo={duesInfo}
            isDone={done}
            id={id}
            payementBoxRef={payementBoxRef}
            changeOccured={changeOccured}
            onPaynow={handlePaynow}
          />
          <AddOns onClick={setDuesInfo} />
        </div>
      </div>
    </div>
  );
}

function CustomerDetails({
  id,
  duesInfo,
  basicInfo,
  personalityInfo,
  handlePersonalityInfoChange,
  handleBasicInfoTextFieldChange,
  handleBasicInfoOptionsFieldChange,
  showUpdateConfirmPop,
  error,
  done,
  loading,
  handleSubmitBtn,
  changeOccured,
  wordLimit,
  setShowUpdateConfirmPop,
  handleUpdate,
  updatedFields,
  showCreateConfirmPop,
  setShowCreateConfirmPop,
  photos,
  setPhotos,
  setCurrPhotos,
  currPhotos,
  errorRef,
  updateBtnRef,
}) {
  const [imageDropdown, setImageDropdown] = useState(false);
  const imageRef = useRef();
  const artworkRef = useRef();

  const bioWordsLenght =
    basicInfo.bio == "" ? 0 : basicInfo.bio.split(" ").length;

  const openImage = () => "helo";

  const handleImageChange = async () => {
    const files = imageRef.current.files;
    console.log("original", files[0]);
    if (files.length > 0) {
      const src = URL.createObjectURL(files[0]);
      const avartarPreviw = document.getElementById("avatar-preview");
      avartarPreviw.src = src;
      setCurrPhotos((prev) => ({
        ...prev,
        imageUrl: files[0],
        total: prev.artworks.length + 1,
      }));
    }
  };

  const handleRemoveImage = () => {
    const files = imageRef.current.files;
    if (currPhotos.imageUrl != "") {
      const src = URL.createObjectURL(files[0]);
      const avartarPreviw = document.getElementById("avatar-preview");
      avartarPreviw.src = "/assets/default.jpg";
      setCurrPhotos((prev) => ({
        ...prev,
        imageUrl: "",
        total: prev.total - 1,
      }));
    }
  };

  const handleArtworkChange = (e) => {
    setCurrPhotos((prev) => ({
      ...prev,
      artworks: [...prev.artworks, e.target.files[0]],
      total: prev.total + 1,
    }));
  };
  const handleRemoveArtwork = (delIndex) => {
    const filteredArtworks = currPhotos.artworks.filter(
      (item, index) => index != delIndex
    );
    setCurrPhotos((prev) => ({
      ...prev,
      artworks: filteredArtworks,
      total: prev.total - 1,
    }));
  };
  const totalRemainingFreePhotos = photos.total + currPhotos.total;
  console.log(
    "totalphoto",
    totalRemainingFreePhotos,
    "ptotla",
    photos.total,
    "currPhotos",
    currPhotos.total
  );
  let totalPhotos = currPhotos.total + photos.total;
  const totalPaidPhotos = totalPhotos <= 3 ? 0 : totalPhotos - 3;

  const recieptForCreation = {
    creation: true,
  };

  if (currPhotos.total > 3) {
    recieptForCreation.totalPaidPhotos = currPhotos.total - 3;
  }
  recieptForCreation.wordLimit = wordLimit;
  if (id) {
    updatedFields.current.wordLimit = wordLimit;
    if (photos.total > 3) {
      updatedFields.current.totalPaidPhotos = currPhotos.total;
    } else {
      const totalPhotoCount = photos.total + currPhotos.total;
      if (totalPhotoCount > 3) {
        updatedFields.current.totalPaidPhotos = totalPhotoCount - 3;
      }
    }
  }
  return (
    <div className="basis-[60%] bg-white rounded-lg relative">
      {showUpdateConfirmPop && (
        <ConfrimPopup
          updatedFields={updatedFields}
          continueBtnTxt={"Continue editing"}
          confirmBtnTxt={`Confirm ${id ? "updation" : "creation"}`}
          onConfirm={handleUpdate}
          onCloseClick={setShowUpdateConfirmPop}
          width="3/5"
          fromLeft={"30"}
        />
      )}
      {showCreateConfirmPop && (
        <ConfrimPopup
          updatedFields={{ current: recieptForCreation }}
          continueBtnTxt={"Continue editing"}
          confirmBtnTxt={`Confirm ${id ? "updation" : "creation"}`}
          onConfirm={handleUpdate}
          onCloseClick={setShowCreateConfirmPop}
          width="3/5"
          fromLeft={"30"}
        />
      )}
      <div className="bg-gray-300 w-full rounded-lg p-6 flex flex-col items-center gap-y-6">
        <div className="w-fit m-auto relative">
          <img
            className="rounded-full md:w-52 md:h-52 w-36 h-36 object-cover object-top"
            src={photos?.imageUrl || "/assets/default.jpg"}
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
              onClick={() => imageRef.current.click()}
            >
              <img
                src="/assets/icons/edit.svg"
                alt="auth"
                className="md:h-6 h-3"
              />
            </button>
            {/* {imageDropdown && (
              <div className="absolute bg-white rounded-lg">
                <button
                  onClick={() => imageRef.current.click()}
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
            )} */}
          </div>
        </div>
        <p className="text-gray-600 italic text-sm md:text-base">
          *Click pencil to update photo
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
                    wordLimit != 0
                      ? "focus:border-red-500 border-red-500"
                      : " focus:border-gray-700 border-gray-400"
                  } outline-none`}
                ></textarea>
                {wordLimit != 0 && (
                  <p className="text-red-500 text-xs md:text-sm">
                    free limit of 350 words exceeded, you'll have to pay $9.95
                    for each extra 100 words.
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
          <div className="flex  items-center  gap-6 w-full">
            <span className="text-lg">Pick your Artworks</span>
            <button
              onClick={() => artworkRef.current.click()}
              className="border border-black border-3 py-1 px-2 rounded w-fit"
            >
              Choose here
            </button>
            <input
              ref={artworkRef}
              className="cursor-pointer"
              hidden
              accept="image/*"
              type="file"
              onChange={handleArtworkChange}
            />
            {photos.total + currPhotos.total < 3 && (
              <p className="text-red-600 italic md:text-sm text-xs">
                {3 - (photos.total + currPhotos.total)} remaining free
                photo/artworks
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {photos?.artworks.map((item, index) => (
              <div className="bg-gray-200 py-1 px-2 flex justify-between rounded w-1/2 ">
                <a href={openImage(item)} className="hover:underline">
                  Artwork-{index + 1}
                </a>
              </div>
            ))}
            {currPhotos?.artworks.map((item, index) => (
              <div className="bg-gray-200 py-1 px-2 flex justify-between rounded w-1/2 ">
                <a href={openImage(item)} className="hover:underline">
                  New Artwork-{index + 1}
                </a>
                <span
                  onClick={() => handleRemoveArtwork(index)}
                  className="cursor-pointer"
                >
                  x
                </span>
              </div>
            ))}
          </div>
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
          {/* {done && (
            <p className="text-green-500 w-fit text-sm md:text-base">
              Customer {id ? "updated" : "created"} successfully
            </p>
          )} */}
          <div ref={errorRef}>
            {error && (
              <p className="text-fr-red w-fit text-sm md:text-base">{error}</p>
            )}
          </div>

          <button
            className={`ml-auto  bg-fr-blue-200 w-1/3 md:w-1/5  text-white p-1.5 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
            onClick={handleSubmitBtn}
            // disabled={loading}
            ref={updateBtnRef}
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
  );
}

function AddOns({ onClick }) {
  const addonsList = ["Feature Placement", "Premium Placement"];
  const addonCostMap = {
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
          <label
            key={addon}
            className="w-full  flex items-center gap-x-3 cursor-pointer"
          >
            <input
              type="checkbox"
              onChange={() => handleChange(addon)}
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
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
  isDone,
  id,
  payementBoxRef,
  changeOccured,
  onPaynow,
}) {
  console.log("duesInfo", duesInfo);

  console.log("isDone", isDone, "changeOccured", changeOccured);
  const addonsList = ["featuredPlacement", "premiumPlacement", "renewal"];
  const addons = Object.keys(duesInfo).some(
    (field) => addonsList.includes(field) && duesInfo[field]
  );
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
  // adding paid photos
  total = total + duesInfo.totalPaidPhotos * 9.95;

  total = roundTo(total, 2);
  console.log("total here", total, total != 0);
  console.log("addons", addons);
  return (
    <div
      ref={payementBoxRef}
      className=" bg-white rounded-lg h-fit px-6 md:px-12 py-6 flex flex-col gap-y-6 border"
    >
      <h1 className="text-2xl  font-bold text-center">Pending Dues</h1>
      <PaymentReceipt obj={duesInfo} />
      <div className="flex flex-col gap-y-2 text-white">
        <button
          className={`py-2 w-full bg-green-600 rounded-lg ${
            (!isDone && !addons) || total == 0
              ? "opacity-50 cursor-not-allowed"
              : "curose-pointer"
          }`}
          disabled={(!isDone && !addons) || total == 0}
          onClick={onPaynow}
        >
          Pay now
        </button>
        <p className="text-gray-600 italic text-center text-xs md:text-sm">
          {`*First ${id ? "update" : "create"} your profile to pay for it`}
        </p>
      </div>
    </div>
  );
}

export default CreateCustomer;
