import axios from "axios";
import { baseUrl } from "../utils/authCodeMap";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function usePost() {
  const { updateAuthInfo } = useContext(AuthContext);

  const post = async (url, body, auth = true) => {
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
      const response = await axios.post(completeUrl, body, {
        headers,
      });
      console.log(
        "reqType",
        "post",
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
  return post;
}

export { usePost };
