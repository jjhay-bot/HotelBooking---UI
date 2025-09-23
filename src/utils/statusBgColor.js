/**
 * Determines the color representation for a given progress status.
 *
 * @param {'completed' | 'approved' | 'rejected' | 'not_started' | 'pending' | 'processing'} status - The current status of the progress item.
 * @returns {'completed' | 'rejected' | 'processing'} The color category for the status.
 */

import { bgcolor } from "@constants";

export const statusBgColor = (status = "not_started") => {
  if (status === undefined || status === null) {
    throw new Error("The 'status' parameter is required.");
  }
  if (["completed", "approved"].includes(status)) {
    return bgcolor.success;
  }
  if (["rejected"].includes(status)) {
    return bgcolor.rejected;
  }
  if (["pending", "processing"].includes(status)) {
    return bgcolor.processing;
  }
  if ([""].includes(status)) {
    return bgcolor.rejected;
  }
  return bgcolor.primary;
};
