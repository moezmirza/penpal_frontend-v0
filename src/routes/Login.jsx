import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import Separater from "../components/Separater";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../state/slices/userSlice";
import { setAuth } from "../state/slices/authSlice";
import mapAuthCodeToMessage from "../utils/authCodeMap";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      if (user) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      const errString = mapAuthCodeToMessage(err.code);
      setError(errString);
    }
  };

  const handleSignInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const currentUser = {
      name: user.displayName,
      email: user.email,
    };
    const authInfo = {
      token: user.accessToken,
      isAuth: true,
    };
    dispatch(setCurrentUser(currentUser));
    dispatch(setAuth(authInfo));
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center bg-register h-screen w-screen">
      <div className="flex flex-col items-center gap-y-6  bg-white p-8 w-1/3 rounded-lg">
        <h2 className="text-web-heading-2 font-bold text-gray-900 flex gap-x-3">
          Welcome Back
          <span>👋</span>{" "}
        </h2>
        <p className="text-gray-500">Enter your credentionals to login</p>
        {error && <p className="text-red-500 mt-1"> {error} </p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 w-full">
          <label className="text-sm text-left text-lg">
            Email
            <input
              type="text"
              id="name"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full mt-2 rounded-md p-2 border border-gray-400 outline-none focus:border-gray-700 "
              required
              placeholder="Enter your email"
            />
          </label>

          <label className=" text-sm text-left text-lg">
            Password
            <input
              type="text"
              id="name"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full mt-2 rounded-md p-2 border border-gray-400 outline-none focus:border-gray-700 "
              required
              placeholder="Enter your password"
            />
          </label>

          <button
            type="submit"
            className="bg-fr-blue hover:bg-fr-blue-100 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>

        <Separater text={"OR"} />

        <div className="flex items-center justify-center">
          <button
            onClick={handleSignInWithGoogle}
            className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 bg-white"
          >
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span>Login with Google</span>
          </button>
        </div>

        <p className="m-auto ">
          Don't have an account?
          <a href="/register" className="underline text-fr-blue mx-1">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
