import axios from "axios";

async function post(body) {
  try {
    const response = await axios.post(
      "https://penpal-prod.vercel.app/api/v1/user",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
