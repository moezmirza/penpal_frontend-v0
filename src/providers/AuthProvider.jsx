import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { auth } from "../services/firebase";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ token: null });
  const [loading, setLoading] = useState(true);
  const updateAuthInfo = (authInfo) => {
    
    setAuthInfo({ token: authInfo.token });

    console.log("update authIno", authInfo);
    authInfo.userAuth != undefined &&
      localStorage.setItem("userAuth", authInfo.userAuth);
    authInfo.adminAuth != undefined &&
      localStorage.setItem("adminAuth", authInfo.adminAuth);
  };

  useEffect(() => {
    const refreshService = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        const authInfo = {
          token: user.accessToken,
        };
        updateAuthInfo(authInfo);
      }
    });
    return () => refreshService();
  }, [auth]);

  const context = {
    authInfo,
    updateAuthInfo,
  };
  return (
    <AuthContext.Provider value={context}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
