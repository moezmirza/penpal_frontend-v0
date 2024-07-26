import { useEffect, useRef, useState } from "react";
import { usePost } from "../api/usePost";
import { Link, useNavigate } from "react-router-dom";
import mapAuthCodeToMessage, { baseUrl } from "../utils/authCodeMap";
import { LoadingSpinner } from "../components/LoadingSpinner";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: "false",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const post = usePost();
  const passwordRef = useRef();
  const imageRef = useRef();
  const isUserLoggedIn = JSON.parse(localStorage.getItem("userAuth"));
  const isAdminLoggedIn = JSON.parse(localStorage.getItem("adminAuth"));

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
    for (const key in formData) {
      console.log(key, formData[key], key == "terms", formData[key] == "false");
      if (key == "terms" && formData[key] == "false") {
        setError("All fields are required");
        return;
      }
      if (formData[key] === "") {
        setError("All fields are required");
        return;
      }
    }
    console.log(formData);
    setLoading(true);
    const { success, data, error } = await post("/user", formData);
    if (success) {
      setLoading(false);
      navigate("/login");
    } else {
      setLoading(false);
      setError(mapAuthCodeToMessage(error.message));
    }
  };

  const changePassInputType = () => {
    console.log("inside drop", passwordRef.current.type);
    if (passwordRef.current.type == "password") {
      passwordRef.current.type = "text";
      imageRef.current.src = "assets/icons/eye.svg";
    } else {
      passwordRef.current.type = "password";
      imageRef.current.src = "assets/icons/eyeSlash.svg";
    }
  };

  return (
    <div className="flex justify-center md:items-center  py-20 md:py-6 bg-b-general py-6 px-3 md:px-8  h-screen md:h-full ">
      <div className="flex flex-col items-center gap-y-6 bg-white p-4 md:p-8 w-full md:mt-0 mt-32 h-fit md:w-2/5 rounded-lg relative">
        <LoadingSpinner isLoading={loading} />
        <h2 className="md:text-4xl text-2xl font-bold text-gray-900 flex gap-x-4">
          Create Account
          <span className="md:text-3xl text-2xl">📥</span>
        </h2>
        <p className="text-gray-500 text-sm md:text-base text-center">
          Fill in the details to create your Account
        </p>
        {error && (
          <p className="text-red-500 m-1 text-sm md:text-base">{error} </p>
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
                onClick={changePassInputType}
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
          <label className="flex gap-x-4 cursor-pointer">
            <input
              type="checkbox"
              name="terms"
              value={formData.terms}
              onChange={handleChange}
            />
            <p>
              I agree to the{" "}
              <a className="underline" href="">
                terms and privacy
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
