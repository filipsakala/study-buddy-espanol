import apiConfig from "./apiConfig";

// Wrapper for all BE API calls
const apiFetch = <T>(
  endpoint: string,
  method: "GET" | "POST" = "GET",
  bodyObject?: any
): Promise<T | undefined> => {
  return fetch(`${apiConfig.apiUrl}` + endpoint, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body:
      (method !== "GET" && bodyObject && JSON.stringify(bodyObject)) ||
      undefined,
  })
    .then(async (response) => {
      if (!response.ok) {
        console.log("[apiFetch] Failed to complete database query.");
        return;
      }

      const responseBody = await response.json();
      if (responseBody?.errors) {
        console.error(
          "[apiFetch] Failed to complete database query with errors: ",
          responseBody.errors
        );
        return;
      }

      return responseBody;
    })
    .catch((errorMessage) => {
      console.log("[apiFetch] Failed to complete database query.");
      console.error(errorMessage);
    });
};

export default apiFetch;
