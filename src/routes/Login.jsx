import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import Separater from "../components/Separater";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../state/slices/userSlice";
import { setAuth } from "../state/slices/authSlice";
import mapAuthCodeToMessage from "../utils/authCodeMap";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { get } from "../api/get";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      let user = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("user", user);
      if (user) {
        user = user.user;
        console.log("user.user", user);
        const currentUser = {
          name: user.displayName,
          email: user.email,
        };
        const authInfo = {
          token: user.accessToken,
          isAuth: true,
        };

        let { success, data, error } = await get("/user", authInfo.token);
        console.log(success, "UserData", data);
        if (success) {
          dispatch(setCurrentUser(data));
          dispatch(setAuth(authInfo));
          navigate("/user-profile");
        }
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      const errString = mapAuthCodeToMessage(err.code);
      setLoading(false);
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
    navigate("/user-profile");
  };
  return (
    <div className="flex justify-center items-center bg-b-general pt-6 md: pt-3 pb-3 px-3">
      <div className="flex flex-col items-center gap-y-6 bg-white p-4 md:p-8 md:w-1/3 w-full rounded-lg relative text-sm md:text-base">
        {loading && <LoadingSpinner />}
        <h2 className="text-2xl md:text-5xl font-bold text-gray-900 flex gap-x-3">
          Welcome Back
          <span className="text-2xl md:text-4xl">👋</span>{" "}
        </h2>
        <p className="text-gray-500  text-center">
          Enter your credentionals to login
        </p>
        {error && (
          <p className="text-red-500 mt-1 "> {error} </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 w-full ">
          <label className="text-left">
            Email
            <input
              type="text"
              id="name"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full mt-2 rounded-md p-1.5 md:p-2 border border-gray-400 outline-none focus:border-gray-700 "
              required
              placeholder="Enter your email"
            />
          </label>

          <label className=" text-left">
            Password
            <input
              type="text"
              id="name"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full mt-2 rounded-md p-1.5 md:p-2 border border-gray-400 outline-none focus:border-gray-700 "
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
          <Link className="underline text-fr-blue mx-1" to={"/register"}>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
