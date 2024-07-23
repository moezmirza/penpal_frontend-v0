import axios from "axios";
import { baseUrl } from "../utils/authCodeMap";
import { auth } from "../services/firebase";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

// Custom hook
function useGet() {
  const { updateAuthInfo } = useContext(AuthContext);

  const get = async (url) => {
    console.log("here inside of get");

    try {
      const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
      console.log("tokeninfro", tokenInfo);
      const authToken = tokenInfo?.token;
      console.log("auhtTOkne", authToken);
      if (!authToken || Date.now() - tokenInfo?.createdAt > 1000 * 60 * 30) {
        const refreshAccessToken = await auth?.currentUser?.getIdToken(true);
        console.log("curruserinGet", currUser);
        const authInfo = {
          token: refreshAccessToken,
        };
        updateAuthInfo(authInfo);
        //30 mins
      }

      console.log("url and token", url, authToken);
      const completeUrl = baseUrl + url;
      let headers = {
        "Content-Type": "application/json",
      };
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }
      console.log("complete URL and headers", completeUrl, headers);
      const response = await axios.get(completeUrl, {
        headers,
      });
      console.log("response", response);
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error("Error posting data:", error);
      return {
        success: false,
        error: error.response ? error.response.data : error.message,
      };
    }
  };

  return get;
}

export { useGet };
