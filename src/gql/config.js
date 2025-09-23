import { createHttpLink } from "@apollo/client";
import { env } from "@constants";

export const httpLink = createHttpLink({
  uri: env.API_URI,
});
