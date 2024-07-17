import axios from "axios";
import { baseUrl } from "../utils/authCodeMap";

async function get(url, authToken) {
  console.log("here inside of get")
  try {
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
}

export { get };
