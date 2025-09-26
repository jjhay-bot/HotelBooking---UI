import React from "react";
import toast from "react-hot-toast";
import { Notification } from "@components/atoms/Notification";
import { map, startCase } from "lodash";

// NOTIFICATION
export const onError = (message) => {
  toast.custom((t) => React.createElement(Notification, { t, type: "error", message }));
};

export const onSuccess = (message) => {
  toast.custom((t) => React.createElement(Notification, { t, type: "success", message }));
};

export const updateStatus = (arr, id, newStatus) => {
  onSuccess(`${startCase(id)} submitted!`);

  return map(arr, (item) => (item.id === id ? { ...item, status: newStatus } : item));
};
