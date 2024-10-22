import { useContext, useEffect, useRef, useState } from "react";
import {
  getIdTokenResult,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../services/firebase";
import Separater from "../components/Separater";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../state/slices/userSlice";
import mapAuthCodeToMessage from "../utils/authCodeMap";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useGet } from "../api/useGet";
import { AuthContext } from "../providers/AuthProvider";
import Timeout from "../components/Timeout";
import ConfrimPopup from "../components/ConfrimPopup";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [resendEmail, setResendEmail] = useState(false);
  const [resendEmailStatus, setResendEmailStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [infoPopup, setInfoPopup] = useState(false)
  const get = useGet();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const imageRef = useRef();
  const isUserLoggedIn = JSON.parse(localStorage.getItem("userAuth"));
  const isAdminLoggedIn = JSON.parse(localStorage.getItem("adminAuth"));
  console.log("userAuth", isUserLoggedIn, "adminAuth", isAdminLoggedIn);
  const { state: redirectLocation } = useLocation()
  console.log("login location", redirectLocation)


  const { updateAuthInfo } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(formData);
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("result", result);
      if (result) {
        const user = result.user;
        setFirebaseUser(user);
        if (user.emailVerified == false) {
          setLoading(false);
          sendEmailVerification(user);
          setError("Email unverified, verification email sent!");
          setResendEmail(true);
          return;
        }

        const tokenResult = await getIdTokenResult(user);
        console.log("res", tokenResult);
        if (tokenResult.claims.role == "admin") {
          const currentUser = {
            firstName: "Admin",
            email: user.email,
            role: 'admin'
          };
          const authInfo = {
            token: user.accessToken,
            adminAuth: true,
          };
          updateAuthInfo(authInfo);
          dispatch(setCurrentUser(currentUser));
          navigate("/approve-profiles");
        } else {
          const authInfo = {
            token: user.accessToken,
            userAuth: true,
          };
          localStorage.setItem("token", user.accessToken);
          let { success, data, error } = await get("/user", authInfo.token);
          console.log(success, "UserData", data);
          if (success) {
            dispatch(setCurrentUser(data));
          } else {
            console.log("error while getting user creds");
          }
          updateAuthInfo(authInfo);
          const redirectPath = redirectLocation?.pathname ? redirectLocation.pathname : "/"

          console.log("redirecrLocation", redirectLocation, "redirect Path", redirectPath)
          if (redirectPath == "/payment") {
            navigate(redirectPath, { state: redirectLocation.state })
          } else {
            navigate(redirectPath);
          }

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

  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate("/approve-profiles");
    } else if (isUserLoggedIn) {
      navigate("/");
    } else if (redirectLocation?.pathname) {
      setInfoPopup(true)
    }
  }, []);

  // const handleSignInWithGoogle = async () => {
  //   const result = await signInWithPopup(auth, provider);
  //   const user = result.user;
  //   const currentUser = {
  //     name: user.displayName,
  //     email: user.email,
  //   };
  //   const authInfo = {
  //     token: user.accessToken,
  //     userAuth: true,
  //   };
  //   dispatch(setCurrentUser(currentUser));
  //   updateAuthInfo(authInfo);
  //   navigate("/");
  // };
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
  const handleResendEmail = (e) => {
    if (!resendEmailStatus) {
      setError("");
      setResendEmailStatus(true);
      sendEmailVerification(firebaseUser);
      setTimeout(() => {
        setResendEmailStatus(false);
      }, 60000);
    }
  };
  const handlePasswordReset = () => {
    if (formData.email) {
      sendPasswordResetEmail(auth, formData.email)
      setError("Password reset email sent!")
    } else {
      setError("Fill out the email!")
    }
  }
  return (
    <div className="flex  justify-center bg-b-general  md:items-center py-16 px-3 h-full">
      <div className="flex flex-col items-center gap-y-3 bg-white p-4 md:p-8 md:w-1/2 lg:w-[35%] w-full h-fit  rounded-lg relative text-sm md:text-base">
        <LoadingSpinner isLoading={loading} />
        {infoPopup && <ConfrimPopup onConfirm={() => setInfoPopup(false)} onCloseClick={setInfoPopup} confirmBtnTxt="Continue" infoText={"You must login to utilize this feature"} />}
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 flex gap-x-3">
          Welcome Back
          <span className="text-2xl md:text-3xl">👋</span>{" "}
        </h2>
        <p className="text-gray-500  text-center">
          Enter your credentials to login
        </p>
        {error && <p className="text-red-500 mt-1 text-center"> {error} </p>}
        {resendEmail && (
          <div className="flex gap-x-2">
            <button
              disabled={resendEmailStatus}
              className="hover:underline"
              onClick={handleResendEmail}
            >
              {resendEmailStatus
                ? "Sent to your email"
                : "Resend verification email"}
            </button>
            {resendEmailStatus && <Timeout timeInSec={60} />}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 w-full ">
          <label className="text-left">
            Email
            <input
              type="email"
              id="name"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full mt-2 rounded-md p-1.5 md:p-2 border border-gray-400 outline-none focus:border-gray-700 "
              required
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
            <button className="w-full text-end text-xs md:text-sm text-fr-blue-100 mt-1.5 hover:underline cursor-pointer"
              onClick={handlePasswordReset}
              type="button"
            >
              Forgot Password
            </button>
          </label>

          <button
            type="submit"
            className="bg-fr-blue hover:bg-fr-blue-100 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>

        {/* <Separater text={"OR"} />

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
        </div> */}

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
