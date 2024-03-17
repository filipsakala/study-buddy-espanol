// Wrapper for all BE API calls
const apiFetch = <T>(endpoint: string): Promise<T | undefined> => {
  return fetch(`${import.meta.env.VITE_API_URL}` + endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
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
