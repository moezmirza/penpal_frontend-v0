import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { baseApi } from "../utils/config";

function usePut() {
  const { updateAuthInfo, authInfo } = useContext(AuthContext);

  const put = async (url, body) => {
    try {
      const authToken = authInfo.token;
      console.log(url, body, authToken);
      const completeUrl = baseApi + url;

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
  return put;
}

export { usePut };
