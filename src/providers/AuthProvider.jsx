import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { auth } from "../services/firebase";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const updateAuthInfo = (authInfo) => {
    localStorage.setItem(
      "tokenInfo",
      JSON.stringify({
        token: authInfo.token,
        createdAt: authInfo.token ? Date.now() : "",
      })
    );

    console.log("update authIno", authInfo);
    authInfo.userAuth != undefined &&
      localStorage.setItem("userAuth", authInfo.userAuth);
    authInfo.adminAuth != undefined &&
      localStorage.setItem("adminAuth", authInfo.adminAuth);
  };

  useEffect(() => {
    const refreshService = onAuthStateChanged(auth, (user) => {
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
    updateAuthInfo,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
