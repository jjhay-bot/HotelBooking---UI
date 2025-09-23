import { alertVar } from "@gql/reactiveVar";
import { map, startCase } from "lodash";

// NOTIFICATION
export const onError = (message) => {
  alertVar({ message, type: "error" });
};

export const onSuccess = (message) => {
  alertVar({ message, type: "success" });
};

export const resetAlert = () => {
  alertVar(null);
};

export const updateStatus = (arr, id, newStatus) => {
  onSuccess(`${startCase(id)} submitted!`);

  return map(arr, (item) => (item.id === id ? { ...item, status: newStatus } : item));
};
