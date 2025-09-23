import { orderBy, snakeCase } from "lodash";

/**
 * Sorts an array of objects by a custom status order.
 *
 * @param {Array} data - The array of objects to sort.
 * @param {string} statusKey - The key in each object that holds the status value.
 * @param {Array<string>} [order=["completed", "approved", "pending", "processing", "rejected"]] - The custom status order.
 * @param {"asc"|"desc"} [direction="asc"] - The sort direction.
 * @returns {Array} A new array sorted by the custom order.
 */

export function sortByStatus(
  data,
  statusKey = "status",
  order = ["completed", "approved", "pending", "processing", "rejected"],
  direction = "asc",
) {
  // Build lookup map for faster sorting
  const rankMap = order.reduce((acc, status, i) => {
    acc[status] = i; // normalize to uppercase
    return acc;
  }, {});

  return orderBy(
    data,
    (item) => rankMap[snakeCase(item[statusKey])] ?? order.length,
    direction,
  );
}
