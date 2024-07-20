import axios from "axios";
import { baseUrl } from "../utils/authCodeMap";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function usePost() {
  const { updateAuhtInfo } = useContext(AuthContext);

  const post = async (url, body) => {
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
      console.log(
        "complete url and auth token",
        completeUrl,
        headers.Authorization
      );
      const response = await axios.post(completeUrl, body, {
        headers,
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error posting data:", error);
      return {
        success: false,
        error: error.response ? error.response.data : error.message,
      };
    }
  };
  return post;
}

export { usePost };
