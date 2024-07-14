import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../state/slices/userSlice";
import { setAuth } from "../state/slices/authSlice";
import { auth } from "../services/firebase";

export const useLoginState = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("here inside")
    const refreshService = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
       
        const authInfo = {
          token: user.accessToken,
          isAuth: true,
        };
        console.log("authInfo", user.accessToken);
        dispatch(setAuth(authInfo));
      }
    });
    return () => refreshService();
  }, []);
  return isAuth;
};
