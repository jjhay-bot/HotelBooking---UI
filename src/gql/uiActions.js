import { map, startCase } from "lodash";
import { alertVar } from "./reactiveVar";

// NOTIFICATION
export const onError = (message) => {
  alertVar({ message, type: "error" });
  // toast.custom((t) => React.createElement(Notification, { t, type: "error", message }));
};

export const onSuccess = (message) => {
  alertVar({ message, type: "success" });
  // toast.custom((t) => React.createElement(Notification, { t, type: "success", message }));
};

export const resetAlert = () => {
  alertVar(null);
};
export const updateStatus = (arr, id, newStatus) => {
  onSuccess(`${startCase(id)} submitted!`);

  return map(arr, (item) => (item.id === id ? { ...item, status: newStatus } : item));
};
