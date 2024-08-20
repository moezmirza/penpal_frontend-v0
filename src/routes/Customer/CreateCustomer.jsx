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
  addonStatetoCost,
} from "../../utils/sharedState";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../services/firebase";
import { useSelector } from "react-redux";
import { usePost } from "../../api/usePost";
import { useGet } from "../../api/useGet";
import { useNavigate, useParams } from "react-router-dom";
import { usePut } from "../../api/usePut";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { v4 } from "uuid";
import BasicInfo, { formattedImageName } from "../User/Profile/BasicInfo";
import ConfrimPopup from "../../components/ConfrimPopup";
import { isEmpty, roundTo } from "../../utils/sharedMethods";
import PaymentReceipt from "../../components/PaymentReciept";
import { dummyBasicInfo, dummyPersonalityInfo } from "../../utils/mockState";

function CreateCustomer() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUpdateConfirmPop, setShowUpdateConfirmPop] = useState(false);
  const [showCreateConfirmPop, setShowCreateConfirmPop] = useState(false);
  const [createdCustomerId, setCreatedCustomerId] = useState(null);

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
    featuredPlacement: 0,
    premiumPlacement: 0,
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
  const [basicInfo, setBasicInfo] = useState(dummyBasicInfo);
  const [personalityInfo, setPersonalityInfo] = useState(
    dummyPersonalityInfo);

  const [initialProfileData, setInitialProfileData] = useState({ basicInfo: {}, personalityInfo: {}, photos: {} })

  const [duesInfo, setDuesInfo] = useState(dueInitiallState);
  const [wordLimit, setWordLimit] = useState(0);
  const [initialBio, setInitialBio] = useState("")
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
  // const updatedFields = useRef(updatedFieldsInitialState); // to keep track of updatedFields
  const [updatedFields, setUpdatedFields] = useState(dueInitiallState) // to keep track of updatedFields

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
  const handleImageRemoteUpdate = async () => {
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

    setShowUpdateConfirmPop(false);
    setShowCreateConfirmPop(false);
    if (id) {
      //only for update
      if (checkForChange(updatedFields)) {
        setError("No changes made");
        return;
      }
    }

    setLoading(true);
    updateBtnRef.current.disabled = true;

    const { imageDownloadURL, artworksDownloadURL, total } =
      await handleImageRemoteUpdate();

    if (id) {
      let updatedBasicInfo = Object.keys(
        updatedFields.basicInfo
      ).reduce((acc, item) => {
        acc[item] = basicInfo[item];
        return acc;
      }, {});

      let updatedPersonalityInfo = Object.keys(
        updatedFields.personalityInfo
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
        wordLimit: updatedFields?.wordLimit ? (wordLimit || 0) + (duesInfo.wordLimit || 0) : 0,
        totalPaidPhotos: updatedFields?.totalPaidPhotos ?
          (updatedFields.totalPaidPhotos || 0) +
          (duesInfo.totalPaidPhotos || 0) : 0,
      };
      console.log("finalObjetct to be putted", finalObj);

      const { success, data, error } = await put(
        `/customer?id=${id}`,
        finalObj
      );

      if (success) {
        setLoading(false);
        setDone(true);


        // Ensure default values for addition
        const newPendingDues = {
          ...updatedFields,
          creation: duesInfo.creation,
          wordLimit: (updatedFields.wordLimit || 0) + (duesInfo.wordLimit || 0),
          totalPaidPhotos:
            (updatedFields.totalPaidPhotos || 0) +
            (duesInfo.totalPaidPhotos || 0),
          premiumPlacement: 0,
          featuredPlacement: 0
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
        const currDuesInfo = {
          totalPaidPhotos: total > 3 ? total - 3 : 0,
          wordLimit: wordLimit,
          creation: true,
        };
        setDuesInfo(currDuesInfo);
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
    setUpdatedFields((updatedFields) => ({
      ...updatedFields,
      basicInfo: {
        ...updatedFields.basicInfo,
        [fieldKey]: true
      }
    }))
    // updatedFields.current.basicInfo[fieldKey] = true;

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
      let totalCount = 0
      if (wordCount <= intialWordCount) {
        setWordLimit(totalCount);
        setUpdatedFields((updatedFields) => ({
          ...updatedFields,
          "wordLimit": totalCount
        }))
        return
      }
      if (wordCount > 350) {
        console.log("wordCount", wordCount);
        if (wordCount > intialWordCount && intialWordCount >= 350) {
          let netWordCount = wordCount - intialWordCount;
          console.log("netWordCount", netWordCount);
          if (netWordCount > 100) {
            totalCount = Math.floor(netWordCount / 100);
            console.log("totalCount", totalCount);
            setWordLimit(totalCount);
            // setWordNum(totalCount);
          }
        } else if (intialWordCount < 350) {
          let netWordCount = wordCount - 350;
          totalCount = Math.floor(netWordCount / 100);
          setWordLimit(totalCount);
        }
      } else {
        totalCount = 0
        setWordLimit(totalCount);
      }
      if (id) {
        setUpdatedFields((updatedFields) => ({
          ...updatedFields,
          "wordLimit": totalCount
        }))
      }
    }
    setUpdatedFields((updatedFields) => ({
      ...updatedFields,
      basicInfo: {
        ...updatedFields.basicInfo,
        [e.target.name]: true
      }
    }))
    // updatedFields.current.basicInfo[e.target.name] = true;
    setBasicInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePersonalityInfoChange = (label, value, remove) => {
    const stateKey = fieldStateNameMap[label];
    let updatedArr = personalityInfo[stateKey];
    setUpdatedFields((updatedFields) => ({
      ...updatedFields,
      personalityInfo: {
        ...updatedFields.personalityInfo,
        [stateKey]: true
      }
    }))

    // updatedFields.current.personalityInfo[stateKey] = true;
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
        data = data[0];
        for (const key in data?.basicInfo) {
          if (key != "spokenLanguages" && basicInfoOptionsField.includes(key)) {
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
        setPhotos(fetchedPhotos);
        setBasicInfo(basicInfoData);
        setPersonalityInfo(fetchedPersonality);
        setInitialProfileData({ basicInfo: basicInfoData, personalityInfo: fetchedPersonality, photos: fetchedPhotos })
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
      // resetState();
    }
  }, [id]);

  const resetState = () => {
    setPhotos(photosIntialState);
    setBasicInfo(basicInfoIntialState);
    setCurrPhotos(photosIntialState)
    setPersonalityInfo(personalityInfoInitialState);
    setDone(false);
    setUpdatedFields(updatedFieldsInitialState)
    // updatedFields.current = updatedFieldsInitialState;
  };
  const checkObjEmpty = (obj) => {
    return Object.values(obj).every((value) => value == false)
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

      if (checkForChange(updatedFields)) {
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

    // console.log("new personalityInfo", personalityInfo);
    // for (const key in personalityInfo) {
    //   if (isEmpty(personalityInfo[key])) {
    //     setError("Fillout all the required fields");
    //     return;
    //   }
    // }

    if (id) {
      setShowUpdateConfirmPop(true);
    } else {
      let updatedDuesInfo = { ...duesInfo, "creation": true, wordLimit: wordLimit, totalPaidPhotos: 0 }
      if (currPhotos.total > 3) {
        updatedDuesInfo = {
          ...updatedDuesInfo,
          totalPaidPhotos: currPhotos.total - 3
        }
      }
      setDuesInfo(updatedDuesInfo)
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


  return (
    <div className="bg-c-basic flex flex-col items-center gap-y-6 py-8 px-3  md:p-12 relative">
      {/* <h1 className="text-4xl font-bold text-left underline">
        Customer Profile
        </h1> */}
      <div className="flex w-full flex-col xl:flex-row gap-12 relative">
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
          wordLimit={wordLimit}
          loading={loading}
          showUpdateConfirmPop={showUpdateConfirmPop}
          handleUpdate={handleUpdate}
          setShowUpdateConfirmPop={setShowUpdateConfirmPop}
          duesInfo={duesInfo}
          onDuesInfo={setDuesInfo}
          showCreateConfirmPop={showCreateConfirmPop}
          setShowCreateConfirmPop={setShowCreateConfirmPop}
          updatedFields={updatedFields}
          photos={photos}
          setPhotos={setPhotos}
          onCurrPhotos={setCurrPhotos}
          currPhotos={currPhotos}
          errorRef={errorRef}
          updateBtnRef={updateBtnRef}
          onUpdatedFields={setUpdatedFields}
          onWordLimit={setWordLimit}
          onBasicInfo={setBasicInfo}
          onPersonalityInfo={setPersonalityInfo}
          photosIntialState={photosIntialState}
          initialProfileData={initialProfileData}
        />
        <div className="basis-[40%] flex flex-col gap-y-6">
          <DuesSection
            duesInfo={duesInfo}
            onDuesInfo={setDuesInfo}
            id={id}
            payementBoxRef={payementBoxRef}
            onPaynow={handlePaynow}
          />
          <AddOns onClick={setDuesInfo} duesInfo={duesInfo} />
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
  loading,
  handleSubmitBtn,
  wordLimit,
  setShowUpdateConfirmPop,
  handleUpdate,
  updatedFields,
  showCreateConfirmPop,
  setShowCreateConfirmPop,
  photos,
  onCurrPhotos,
  currPhotos,
  errorRef,
  onDuesInfo,
  updateBtnRef,
  onUpdatedFields,
  onWordLimit,
  onBasicInfo,
  onPersonalityInfo,
  photosIntialState,
  initialProfileData
}) {
  const imageRef = useRef();
  const artworkRef = useRef();

  const bioWordsLenght =
    basicInfo.bio == "" ? 0 : basicInfo.bio.split(" ").length;

  const updatePhotosState = (updatdCurrPhotos) => {
    onCurrPhotos(updatdCurrPhotos);
    if (id) {
      // updatedFields.current.wordLimit = wordLimit;
      if (photos.total > 3) {
        onUpdatedFields((updatedFields) => ({
          ...updatedFields,
          "totalPaidPhotos": updatdCurrPhotos.total
        }))
        //  updatedFields.current.totalPaidPhotos = currPhotos.total;
      } else {
        const totalPhotoCount = photos.total + updatdCurrPhotos.total;
        if (totalPhotoCount > 3) {
          onUpdatedFields((updatedFields) => ({
            ...updatedFields,
            "totalPaidPhotos": totalPhotoCount - 3
          }))
          //  updatedFields.current.totalPaidPhotos = totalPhotoCount - 3;
        }
      }
    }
  }

  const handleImageUpdate = async () => {
    const files = imageRef.current.files;
    console.log("original", files[0]);
    if (files.length > 0) {
      const src = URL.createObjectURL(files[0]);
      const avartarPreviw = document.getElementById("avatar-preview");
      avartarPreviw.src = src;
      const updatdCurrPhotos = { ...currPhotos, imageUrl: files[0], total: currPhotos.artworks.length + 1 }
      updatePhotosState(updatdCurrPhotos)
    }
  };

  const handleArtworkAddition = (e) => {
    const updatedCurrPhotos = {
      ...currPhotos,
      artworks: [...currPhotos.artworks, e.target.files[0]],
      total: currPhotos.total + 1,
    }
    updatePhotosState(updatedCurrPhotos)
  };

  const handleRemoveArtwork = (delIndex) => {
    const filteredArtworks = currPhotos.artworks.filter(
      (_, index) => index != delIndex
    );
    const updatdCurrPhotos = { ...currPhotos, artworks: filteredArtworks, total: currPhotos.total - 1 }
    updatePhotosState(updatdCurrPhotos)
  };

  // const handleRemoveImage = () => {
  //   const files = imageRef.current.files;
  //   if (currPhotos.imageUrl != "") {
  //     const src = URL.createObjectURL(files[0]);
  //     const avartarPreviw = document.getElementById("avatar-preview");
  //     avartarPreviw.src = "/assets/default.jpg";
  //     setCurrPhotos((prev) => ({
  //       ...prev,
  //       imageUrl: "",
  //       total: prev.total - 1,
  //     }));
  //   }
  // };

  const handleDelUpdateRecieptItem = (name, type) => {
    let updatedPaymentInfo = { ...updatedFields }
    console.log("intiaildata", initialProfileData)
    if (type) {
      if (type == "basicInfo") {
        console.log("initialProfileData -- basicInfo", initialProfileData?.basicInfo)
        onBasicInfo({
          ...basicInfo,
          [name]: initialProfileData.basicInfo?.[name]
        })
        if (name == "bio") {
          onWordLimit(0)
          updatedPaymentInfo = {
            ...updatedPaymentInfo,
            "wordLimit": 0
          }
        }
      }
      if (type == "personalityInfo") {
        onPersonalityInfo({
          ...personalityInfo,
          [name]: initialProfileData.personalityInfo?.[name]
        })
      }
      updatedPaymentInfo[type] = {
        ...updatedPaymentInfo[type],
        [name]: false
      }
    } else {
      if (name == "totalPaidPhotos") {
        onCurrPhotos(photosIntialState)
        const avartarPreviw = document.getElementById("avatar-preview");
        avartarPreviw.src = photos.imageUrl ? photos.imageUrl : "/assets/default.jpg";
      } else if (name == "wordLimit") {
        onBasicInfo({
          ...basicInfo,
          "bio": initialProfileData.basicInfo["bio"]
        })
        onWordLimit(0)
        updatedPaymentInfo["basicInfo"] = {
          ...updatedPaymentInfo["basicInfo"],
          "bio": false
        }
      }
      updatedPaymentInfo = { ...updatedPaymentInfo, [name]: 0 }
    }
    onUpdatedFields(updatedPaymentInfo)
  }

  const handleDelCreateReceiptItem = (name, type) => {
    let updatedDuesInfo = { ...duesInfo }
    if (type) {
      updatedDuesInfo[type] = {
        ...updatedDuesInfo[type],
        [name]: false
      }
    } else {
      updatedDuesInfo = { ...updatedDuesInfo, [name]: 0 }
    }
    onDuesInfo(updatedDuesInfo)
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
          onDelReceiptItem={handleDelUpdateRecieptItem}
        />
      )}
      {showCreateConfirmPop && (
        <ConfrimPopup
          updatedFields={duesInfo}
          continueBtnTxt={"Continue editing"}
          confirmBtnTxt={`Confirm ${id ? "updation" : "creation"}`}
          onConfirm={handleUpdate}
          onCloseClick={setShowCreateConfirmPop}
        // onDelReceiptItem={handleDelCreateReceiptItem}
        />
      )}
      <div className="bg-gray-300 w-full rounded-lg p-2 md:p-6 flex flex-col items-center gap-y-6">
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
            onChange={handleImageUpdate}
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

                >
                  Remove
                </button>
              </div>
            )} */}
          </div>
        </div>
        <p className="text-gray-500 italic text-xs md:text-sm text-center">
          *Click pencil to update your primary photo/artwork or you may upload additional photos/artworks below.
        </p>
      </div>

      <div className="flex flex-col gap-y-6 text-sm  p-2 md:p-6 md:text-base">
        {id && (
          <p className="text-red-500 text-center md:text-sm text-xs italic">
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
                <RequiredFieldLabel
                  labelText={basicInfoFieldLabelMap[field]}
                />
                <textarea
                  name="bio"
                  value={basicInfo[field]}
                  onChange={handleBasicInfoTextFieldChange}
                  placeholder={basicInfoPlaceholderMap[field]}
                  rows={5}
                  className={`bg-transparent block w-full my-1.5 rounded-md p-1.5 border  ${wordLimit != 0
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
            ) : field == "mailingAddress" ?
              <label>
                <RequiredFieldLabel
                  labelText={basicInfoFieldLabelMap[field]}
                  required={true}
                />
                <textarea
                  name="mailingAddress"
                  value={basicInfo[field]}
                  onChange={handleBasicInfoTextFieldChange}
                  placeholder={basicInfoPlaceholderMap[field]}
                  maxRows={2}
                  className={` resize-none bg-transparent block w-full my-1.5 rounded-md p-1.5 border focus:border-gray-700 border-gray-400 outline-none`}
                ></textarea>
              </label>
              : (
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

          <div className="flex flex-col md:flex-row justify-center md:justify-between   gap-6 w-full">
            <span className="text-sm md:text-base">Pick your Artworks</span>
            <button
              onClick={() => artworkRef.current.click()}
              className="border border-black border-3  md:px-2 px-1 rounded w-fit"
            >
              Choose here
            </button>
            <input
              ref={artworkRef}
              className="cursor-pointer"
              hidden
              accept="image/*"
              type="file"
              onChange={handleArtworkAddition}
            />
          </div>
          {photos.total + currPhotos.total < 3 && (
            <p className="text-red-500 italic md:text-sm text-xs">
              {3 - (photos.total + currPhotos.total)} remaining free
              photo/artworks
            </p>
          )}

          <div className="flex flex-col gap-4">
            {photos?.artworks.map((item, index) => (
              <div className="bg-gray-200 py-1 px-2 flex justify-between rounded w-1/2 ">
                <a href="#" className="hover:underline">
                  Artwork-{index + 1}
                </a>
              </div>
            ))}
            {currPhotos?.artworks.map((item, index) => (
              <div className="bg-gray-200 py-1 px-2 flex justify-between rounded w-1/2 ">
                <a href="#" className="hover:underline">
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
          <p className="text-red-500 text-center md:text-sm text-xs italic">
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
            className={`ml-auto  bg-fr-blue-200 w-1/3 md:w-1/5  text-sm md:text-base text-white p-1.5 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
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

function AddOns({ onClick, duesInfo }) {
  const addonsList = ["Feature Placement", "Premium Placement"];
  const addonCostMap = {
    "Feature Placement": "$14.95",
    "Premium Placement": "$24.95",
  };

  const handleChange = (add, addon) => {
    const stateField = addonNameToStateMap[addon];
    onClick((prev) => ({ ...prev, [stateField]: add ? prev[stateField] + 1 : prev[stateField] - 1 < 0 ? 0 : prev[stateField] - 1 }));
  };
  return (
    <div className=" bg-white rounded-lg h-fit px-3 md:px-12 py-6  border text-sm md:text-base">
      <h1 className="text-xl md:text-3xl  underline font-bold text-center">Add-ons</h1>

      <div className="flex flex-col mt-6 gap-y-6 ">
        {addonsList.map((addon) => (
          <label
            key={addon}
            className="w-full flex items-center justify-between cursor-pointer"
          >
            <div className="flex  gap-x-1 md:gap-x-3 items-center">
              <img src="/assets/icons/minus.svg" alt="" className="h-6  bg-gray-200 rounded-full p-1.5 " onClick={() => handleChange(false, addon)} />
              {duesInfo[addonNameToStateMap[addon]]}
              <img src="/assets/icons/plusDark.svg" alt="" className="h-6  bg-gray-200 rounded-full p-1.5 " onClick={() => handleChange(true, addon)} />
            </div>
            <p className={`${addon == "Feature Placement" ? "mr-3" : ""}`}>{addon}</p>
            <p className={`${addon == "Feature Placement" ? "mr-1" : ""}`}  >{addonCostMap[addon]}/month</p>
          </label>
        ))}
      </div>
    </div>
  );
}

function DuesSection({
  duesInfo,
  onDuesInfo,
  id,
  payementBoxRef,
  onPaynow,
}) {
  console.log("duesInfo", duesInfo);

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
      className=" bg-white rounded-lg h-fit px-6 md:px-12 py-6 flex flex-col gap-y-6 border text-sm md:text-base"
    >
      <h1 className=" text-xl md:text-3xl underline font-bold text-center">Pending Dues</h1>
      <PaymentReceipt obj={duesInfo} />
      <div className="flex flex-col gap-y-2 text-white">
        <button
          className={`py-2 w-full bg-green-600 rounded-lg ${total == 0
            ? "opacity-50 cursor-not-allowed"
            : "curose-pointer"
            }`}
          disabled={total == 0}
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
