// Logout function (clears storage and redirects)
export const logout = () => {
  localStorage.removeItem("authInfo");
  localStorage.removeItem("store");
  window.location.href = "/login";
};

// Centralized 401 handler
export const handleUnauthorized = (response) => {
  if (response.status === 401) {
    logout();
    throw new Error("Session expired. Please log in again.");
  }
  return response;
};
