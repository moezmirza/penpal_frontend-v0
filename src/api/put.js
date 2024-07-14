import axios from "axios";
import { baseUrl } from "../utils/authCodeMap";

async function put(url, body, authToken) {
  try {
    console.log(url, body, authToken);
    const completeUrl = baseUrl + url;

    let headers = {
      "Content-Type": "application/json",
    };
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    console.log("body", body, "headers", headers);
    const response = await axios.put(completeUrl, (body), {
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
}

export { put };
