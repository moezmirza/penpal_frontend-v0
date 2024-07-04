import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center bg-register h-screen w-screen">
      <div className="flex flex-col items-center gap-y-6  bg-gray-200 p-8 w-1/3 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 flex gap-x-3">
          Welcome Back
          <span>👋</span>{" "}
        </h2>
        <p className="text-gray-500">Enter your credentionals to login</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 w-full">
          <label className="text-sm text-left text-lg">
            Email
            <input
              type="text"
              id="name"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full mt-2 rounded-md p-2 outline-gray-200  outline-0.5 "
              required
              placeholder="Enter your email"
            />
            {formError["email"] && (
              <p className="text-red-500 mt-1"> {formError["email"]} </p>
            )}
          </label>

          <label className=" text-sm text-left text-lg">
            Password
            <input
              type="text"
              id="name"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full mt-2 rounded-md p-2 outline-gray-200  outline-0.5 "
              required
              placeholder="Enter your password"
            />
            {formError["password"] && (
              <p className="text-red-500 mt-1"> {formError["password"]} </p>
            )}
          </label>

          <button
            type="submit"
            className="bg-fr-blue hover:bg-fr-blue-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>

          <p className="m-auto ">
            Don't have an account?
            <a href="/register" className="underline text-fr-blue mx-1">
              Create Account
            </a>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
