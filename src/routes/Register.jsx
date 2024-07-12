import { useState } from "react";
import { post } from "../api/post";
import { useNavigate } from "react-router-dom";
import mapAuthCodeToMessage from "../utils/authCodeMap";
import { LoadingSpinner } from "../components/LoadingSpinner";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError
    for (const key in formData) {
      if (formData[key] === "") {
        setError("All fields are  required");
        return;
      }
    }
    console.log(formData);
    setLoading(true);
    const { success, data, error } = await post(formData);
    if (success) {
      setLoading(false);
      navigate("/login");
    } else {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center bg-general h-screen w-screen">
      <div className="flex flex-col items-center gap-y-6 bg-white p-8 w-1/3 rounded-lg relative">
        {loading && <LoadingSpinner />}
        <h2 className="text-web-heading-2 font-bold text-gray-900 flex gap-x-4">
          Create Account
          <span className="text-5xl">📥</span>
        </h2>
        <p className="text-gray-500">
          Fill in the details to create your Account
        </p>
        {error && (
          <p className="text-red-500 m-1">{mapAuthCodeToMessage(error)} </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 w-full">
          <label className=" text-sm text-left text-lg">
            First Name
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="block w-full mt-2 rounded-md p-2 border border-gray-400 outline-none focus:border-gray-700"
              required
              placeholder="Enter your name"
            />
          </label>
          <label className=" text-sm text-left text-lg">
            Last Name
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="block w-full mt-2 rounded-md p-2 border border-gray-400 outline-none focus:border-gray-700"
              required
              placeholder="Enter your name"
            />
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
