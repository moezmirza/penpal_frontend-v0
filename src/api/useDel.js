import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { baseApi } from "../utils/config";

function useDel() {
  const { updateAuthInfo, authInfo } = useContext(AuthContext);

  const del = async (url) => {
    try {
      const authToken = authInfo.token;

      let headers = {
        "Content-Type": "application/json",
      };
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const completeUrl = baseApi + url;
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
