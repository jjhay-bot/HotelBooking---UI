export const isAuthenticated = () => {
  return sessionStorage.getItem("isAuthenticated") === "true";
};
