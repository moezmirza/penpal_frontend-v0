import axios from "axios";
import { baseUrl } from "../utils/authCodeMap";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function useDel() {
  const { updateAuthInfo } = useContext(AuthContext);

  const del = async (url) => {
    try {
      const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
      const authToken = tokenInfo?.token;
      if (Date.now() - tokenInfo?.createdAt > 1000 * 60 * 30) {
        const refreshAccessToken = await auth?.currentUser?.getIdToken(true);
        const authInfo = {
          token: refreshAccessToken,
        };
        console.log("authInfo", authInfo);
        updateAuthInfo(authInfo);
      }

      let headers = {
        "Content-Type": "application/json",
      };
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const completeUrl = baseUrl + url;
      const response = await axios.delete(completeUrl, {
        headers,
      });
      console.log(
        "reqType",
        "del",
        "endPoint",
        url,
        "response",
        response.data.data
      );
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error("endPoint", url, "error:", error);
      return {
        success: false,
        error: error.response ? error.response.data : error.message,
      };
    }
  };
  return del;
}

export { useDel };
