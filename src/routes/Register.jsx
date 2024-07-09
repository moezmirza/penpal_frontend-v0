import { useState } from "react";
import postRequest from "../api/post";
import { useNavigate } from "react-router-dom";
import mapAuthCodeToMessage from "../utils/authCodeMap";
import { LoadingSpinner } from "../components/LoadingSpinner";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { success, data, error } = await postRequest(formData);
    if (success) {
      navigate("/login");
    } else {
      setFormError(error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-register h-screen w-screen">
      <div className="flex flex-col items-center gap-y-6 bg-white p-8 w-1/3 rounded-lg">
        <h2 className="text-web-heading-2 font-bold text-gray-900 flex gap-x-4">
          Create Account
          <span className="text-5xl">📥</span>
        </h2>
        <p className="text-gray-500">
          Fill in the details to create your Account
        </p>
        {formError["general"] && (
          <p className="text-red-500 m-1">
            {" "}
            {mapAuthCodeToMessage(formError["general"])}{" "}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 w-full">
          <label className=" text-sm text-left text-lg">
            Name
            <input
              type="text"
              name="fullname"
              value={formData.name}
              onChange={handleChange}
              className="block w-full mt-2 rounded-md p-2 border border-gray-400 outline-none focus:border-gray-700"
              required
              placeholder="Enter your name"
            />
            {formError["fullname"] && (
              <p className="text-red-500 mt-1"> {formError["name"]} </p>
            )}
          </label>
          <label className=" text-sm text-left text-lg">
            Email
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full mt-2 rounded-md p-2 border border-gray-400 outline-none focus:border-gray-700"
              required
              placeholder="Enter your email"
            />
            {formError["email"] && (
              <p className="text-red-500 mt-1"> {formError["email"]} </p>
            )}
          </label>
          <label className="text-sm text-left text-lg">
            Password
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full mt-2 rounded-md p-2 border border-gray-400 outline-none focus:border-gray-700"
              required
              placeholder="Enter your password"
            />
            {formError["password"] && (
              <p className="text-red-500 mt-1"> {formError["password"]} </p>
            )}
          </label>
          <label className="flex gap-x-4 cursor-pointer">
            <input type="checkbox" />
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
            <a href="/login" className="underline text-fr-blue mx-1">
              Login here
            </a>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
