import axios from "axios";
import { auth } from "../services/firebase";
import { useContext } from "react";
import { baseApi } from "../utils/config";
import { AuthContext } from "../providers/AuthProvider";

// Custom hook
function useGet() {
  const { authInfo } = useContext(AuthContext);

  const get = async (url, initialToken = null) => {
    console.log("here inside of get");
    try {
      const authToken = authInfo.token;
      const completeUrl = baseApi + url;
      let headers = {
        "Content-Type": "application/json",
      };
      headers.Authorization = "unauthenticated" // for requests that not require authentication
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }
      if (initialToken) {
        headers.Authorization = `Bearer ${initialToken}`;
      }
      console.log("complete URL and headers", completeUrl, headers);
      const response = await axios.get(completeUrl, {
        headers,
      });
      console.log(
        "reqType",
        "get",
        "endPoint",
        url,
        "response",
        response.data.data
      );
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error("reqType", "get", "endPoint", url, "error:", error);
      return {
        success: false,
        error: error.response ? error.response.data : error.message,
      };
    }
  };

  return get;
}

export { useGet };
