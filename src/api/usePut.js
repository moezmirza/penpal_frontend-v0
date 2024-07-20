import axios from "axios";
import { baseUrl } from "../utils/authCodeMap";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function usePut() {
  const { updateAuhtInfo } = useContext(AuthContext);

  const put = async (url, body) => {
    try {
      const tokenInfo = JSON.parse(localStorage.getItem("tokenInfo"));
      console.log("tokeninfro", tokenInfo);
      const authToken = tokenInfo?.token;
      console.log("auhtTOkne", authToken);
      if (Date.now() - tokenInfo?.createdAt > 1000 * 60 * 30) {
        const refreshAccessToken = await auth?.currentUser?.getIdToken(true);
        console.log("curruserinGet", currUser);
        const authInfo = {
          token: refreshAccessToken,
          isAuth: true,
        };
        updateAuhtInfo(authInfo);
        //30 mins
      }
      console.log(url, body, authToken);
      const completeUrl = baseUrl + url;

      let headers = {
        "Content-Type": "application/json",
      };
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }
      console.log("body", body, "headers", headers);
      const response = await axios.put(completeUrl, body, {
        headers,
      });
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error("Error updating data:", error);
      return {
        success: false,
        error: error.response ? error.response.data : error.message,
      };
    }
  };
  return put;
}

export { usePut };
