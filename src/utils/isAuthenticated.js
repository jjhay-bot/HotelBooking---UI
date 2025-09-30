export const isAuthenticated = () => {
  return sessionStorage.getItem("isAuthenticated") === "true";
};

export const isAdmin = () => {
  return sessionStorage.getItem("userRole") === "admin";
};
