import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { auth } from "../services/firebase";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const updateAuthInfo = (authInfo) => {
    localStorage.setItem("auth", authInfo.isAuth);
    localStorage.setItem(
      "tokenInfo",
      JSON.stringify({
        token: authInfo.token,
        createdAt: authInfo.token ? Date.now() : "",
      })
    );
    localStorage.setItem("admin", authInfo.isAdmin);
  };

  useEffect(() => {
    const refreshService = onAuthStateChanged(auth, (user) => {
      if (user) {
        const authInfo = {
          token: user.accessToken,
          isAuth: true,
          isAdmin: localStorage.getItem("admin") == "true" ? true : false,
        };
        updateAuthInfo(authInfo);
      }
    });
    return () => refreshService();
  }, []);

  const context = {
    updateAuthInfo,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
