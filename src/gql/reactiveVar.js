import { makeVar } from "@apollo/client";

// LOADING
export const initLoadingVar = makeVar(false);
export const loadingVar = makeVar(false);

// NOTIFICATION
export const alertVar = makeVar(
  null,
  // { message: "Photo submitted!", type: "success" }
);

