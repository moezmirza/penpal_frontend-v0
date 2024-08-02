import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { baseApi } from "../utils/config";

function usePost() {
  const { authInfo } = useContext(AuthContext);

  const post = async (url, body, auth = true) => {
    try {
      const authToken = authInfo.token;

      let headers = {
        "Content-Type": "application/json",
      };
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const completeUrl = baseApi + url;
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
      console.error("reqType", "post", "endPoint", url, "error:", error);
      return {
        success: false,
        error: error.response ? error.response.data : error.message,
      };
    }
  };
  return post;
}

export { usePost };
