import axios from "axios";
import { auth } from "../services/firebase";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import { baseApi } from "../utils/config";

// Custom hook
function useGet() {
  const { updateAuthInfo, authInfo } = useContext(AuthContext);

  const get = async (url) => {
    console.log("here inside of get");

    try {
      const authToken = authInfo.token;

      console.log("url and token", url, authToken);
      const completeUrl = baseApi + url;
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
      console.log("endPoint", url, "response", response.data.data);
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error("endPoint", url, "error:", error);
      return {
        success: false,
        error: error.response ? error.response.data : error.message,
      };
    }
  };

  return get;
}

export { useGet };
