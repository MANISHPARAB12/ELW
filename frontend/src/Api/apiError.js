export const getApiError = (error) => {
  if (error.response) {
    // Server responded with an error status.
    return error.response.data?.msg ||
      error.response.data?.message ||
      `Request failed (${error.response.status})`;
  }

  if (error.code === "ECONNABORTED") {
    return "Request timed out. Please try again.";
  }

  if (error.request) {
    return "Cannot connect to the server. Check your connection.";
  }

  return "Something went wrong. Please try again.";
};