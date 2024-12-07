import { useEffect, useRef, useState } from "react";
import { usePost } from "../api/usePost";
import { Link, useNavigate } from "react-router-dom";
import mapAuthCodeToMessage from "../utils/authCodeMap";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { InputField } from "../components/mainComponents/InputField";
import { MultiSelectField } from "../components/mainComponents/MultiSelectField";
import { stateList } from "../utils/sharedState";
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mailingAddress: "",
    state: [],
    city: "",
    zipCode: "",
    terms: "false",
  });

  const [error, setError] = useState("");
  const [passwordMismatchErr, setPasswordMismatchErr] = useState("")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const post = usePost();
  const passwordRef = useRef();
  const confirmPassworfRef = useRef()
  const imageRef = useRef();
  const isUserLoggedIn = JSON.parse(localStorage.getItem("userAuth"));
  const isAdminLoggedIn = JSON.parse(localStorage.getItem("adminAuth"));

  const path = window.location.search;
  const urlParams = new URLSearchParams(path);
  const action = urlParams.get("action");

  const infoText =
    action == "submitProfile"
      ? " To Submit a New Prison Pen Pal Profile or to Modify or Renew an existing Prison Pen Pal Profile you must first create an account by registering below."
      : "Fill in the details to create an account";

  const handleChange = (e) => {
    console.log(e, e.target.value);
    let updateValue = e.target.value;
    if (e.target.name == "terms") {
      updateValue = updateValue == "false" ? "true" : "false";
    }
    setFormData({
      ...formData,
      [e.target.name]: updateValue,
    });
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate("/user-profiles");
    } else if (isUserLoggedIn) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    toast.error("");
    for (const key in formData) {
      console.log(key, formData[key], key == "terms", formData[key] == "false");
      if (key == "terms" && formData[key] == "false") {
        setError("All fields are required!");
        toast.error("All fields are required!");
        return;
      }
      if (formData[key] === "") {
        setError("All fields are required!");
        toast.error("All fields are required!");
        return;
      }
      if (passwordMismatchErr) {
        setError("Password's criteria not fulfilled!")
        toast.error("Password's criteria not fulfilled!")
        return;
      }
    }
    setLoading(true);
    const { success, data, error } = await post("/user", formData);
    if (success) {
      setLoading(false);
      navigate("/login");
    } else {
      setLoading(false);
      setError(mapAuthCodeToMessage(error.message));
      toast.error(mapAuthCodeToMessage(error.message));
    }
  };

  const changePasswordInputType = (e) => {
    console.log("inside drop", passwordRef.current.type);
    if (passwordRef.current.type == "password") {
      passwordRef.current.type = "text";
      confirmPassworfRef.current.type = "text"
      e.target.src = "assets/icons/eye.svg";
    } else {
      passwordRef.current.type = "password";
      confirmPassworfRef.current.type = "password"
      e.target.src = "assets/icons/eyeSlash.svg";
    }
  };

  const handleBlur = () => {
    console.log("blurred called")
    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatchErr('Passwords do not match');
    } else {
      setPasswordMismatchErr('');
    }
  };

  const handleBasicInfoOptionsFieldChange = (label, value, remove) => {
    const fieldKey = 'state';
    let updatedArr = formData[fieldKey];
    setFormData((updatedFields) => ({
      ...updatedFields,
      [fieldKey]: true
    }))
    if (remove) {
      updatedArr = updatedArr.filter((item) => item != value);
    } else {
      updatedArr = [value];
    }
    const newObj = { ...formData, [fieldKey]: updatedArr };
    setFormData(newObj);
  };

  return (
    <div className="flex justify-center md:items-center md:py-6 bg-b-general py-16 px-3  md:h-full ">
      <div className="flex flex-col items-center gap-y-3 bg-white p-4 md:p-8 w-full h-fit md:w-2/5 rounded-lg relative">
        <LoadingSpinner isLoading={loading} />
        <h2 className="md:text-4xl text-2xl font-bold text-gray-900 flex gap-x-4">
          Create Account
          <span className="md:text-3xl text-2xl">📥</span>
        </h2>
        <p className="text-gray-500 text-sm md:text-base text-center">
          {infoText}
        </p>
        {error && (
          <p className="text-red-500  text-sm md:text-base">{error} </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-6 w-full text-sm md:text-base"
        >
          <label className="  text-left">
            First Name
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="block w-full mt-2 rounded-md p-1.5 md:p-2 border border-gray-400 outline-none focus:border-gray-700"
              placeholder="Enter your name"
            />
          </label>
          <label className="  text-left ">
            Last Name
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="block w-full mt-2 rounded-md p-1.5 md:p-2 border border-gray-400 outline-none focus:border-gray-700"
              placeholder="Enter your name"
            />
          </label>
          <label className="  text-left ">
            Email
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full mt-2 rounded-md p-1.5 md:p-2 border border-gray-400 outline-none focus:border-gray-700"
              placeholder="Enter your email"
            />
          </label>
          <label className="text-left">
            <div className="flex items-center gap-x-6  justify-between">
              Password
              <img
                src={`/assets/icons/eyeSlash.svg`}
                alt=""
                ref={imageRef}
                className="h-4 md:h-6 cursor-pointer"
                onClick={changePasswordInputType}
              />
            </div>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full mt-2 rounded-md p-1.5 md:p-2 border border-gray-400 outline-none focus:border-gray-700 "
              required
              placeholder="Enter your password"
            />
          </label>
          <label className="text-left">
            <div className="flex items-center gap-x-4">
              Confirm Password
              <span className="text-xs md:text-sm text-red-600 italic">{passwordMismatchErr}</span>
            </div>
            <input
              ref={confirmPassworfRef}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full mt-2 rounded-md p-1.5 md:p-2 border ${passwordMismatchErr ? 'border-2 border-red-500' : 'border-gray-400'} outline-none focus:border-gray-700`}
              required
              placeholder="Confirm your password"
            />
          </label>
          <label>
            <div className="flex items-center gap-x-4">
              Mailing Address
            </div>
            <textarea
              name="mailingAddress"
              value={formData.mailingAddress}
              onChange={handleChange}
              placeholder={"123 Main St, Apt 4B"}
              maxRows={2}
              className={` resize-none bg-transparent block w-full my-1.5 rounded-md p-1.5 border focus:border-gray-700 border-gray-400 outline-none`}
            ></textarea>
          </label>
          <label>
            <div className="flex items-center gap-x-4">
              State
            </div>
            <MultiSelectField
              key={"state"}
              placeholderText={stateList[0]}
              dropdownOptions={stateList}
              selectedOptions={formData.state}
              onChange={handleBasicInfoOptionsFieldChange}
            />
          </label>
          <label>
            <div className="flex items-center gap-x-4">
              City
            </div>
            <InputField
              key={"city"}
              type={"text"}
              placeholder={"New York"}
              name={"city"}
              value={formData.city}
              onChange={handleChange}
            />
          </label>
          <label>
            <div className="flex items-center gap-x-4">
              Zip Code
            </div>
            <InputField
              key={"zipCode"}
              type={"text"}
              placeholder={"59499"}
              name={"zipCode"}
              value={formData.zipCode}
              onChange={handleChange}
            />
          </label>
          <label className="flex gap-x-4 cursor-pointer">
            <input
              type="checkbox"
              name="terms"
              value={formData.terms}
              onChange={handleChange}
            />
            <p>
              I agree to the{" "}
              <a className="underline" href="https://awayoutpenpals.com/terms-and-conditions/">
                terms and conditions
              </a>
            </p>
          </label>
          <button
            type="submit"
            className="bg-fr-blue hover:bg-fr-blue-100 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
          <p className="m-auto ">
            Have an account?{" "}
            <Link className="underline text-fr-blue mx-1" to={"/login"}>
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
