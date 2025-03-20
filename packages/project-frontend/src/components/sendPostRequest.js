export async function sendPostRequest(url, payload, authToken = "") {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error) {
    console.error("Error sending POST request:", error);
  }
}
