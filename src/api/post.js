import axios from "axios";
import { baseUrl } from "../utils/authCodeMap";

async function post(url, body, authToken) {
  try {
    console.log(url, body, authToken);
    const completeUrl = baseUrl + url;
    
    let headers = {
      "Content-Type": "application/json",
    };
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    console.log("complete url and auth token", completeUrl, headers.Authorization)
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
}

export { post };
