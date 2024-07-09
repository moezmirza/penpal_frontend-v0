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
    const refreshService = onAuthStateChanged(auth, (user) => {
      if (user) {
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
      }
    });
    return () => refreshService();
  }, []);
  return isAuth;
};
