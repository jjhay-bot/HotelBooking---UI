/**
 * Determines the color representation for a given progress status.
 *
 * @param {'completed' | 'approved' | 'rejected' | 'not_started' | 'pending' | 'processing'} status - The current status of the progress item.
 * @returns {'completed' | 'rejected' | 'processing'} The color category for the status.
 */

export const progressColor = (status = "not_started") => {
  if (status === undefined || status === null) {
    throw new Error("The 'status' parameter is required.");
  }
  if (["completed", "approved"].includes(status)) {
    return "completed";
  }
  if (["rejected", "not_started"].includes(status)) {
    return "rejected";
  }
  if (["pending", "processing"].includes(status)) {
    return "processing";
  }
  return "default";
};
