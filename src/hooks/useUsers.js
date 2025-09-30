import { env } from "@/constants";
import { useEffect, useState } from "react";

export default function useUsers(page = 1, pageSize = 10) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(`${env.API_URI}/api/v1/users?page=${page}&pageSize=${pageSize}`, {
      credentials: "include", // Send cookies for authentication
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setUsers(Array.isArray(data.users) ? data.users : []);
          setTotal(typeof data.totalCount === "number" ? data.totalCount : 0);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [page, pageSize]);

  return { users, loading, error, total };
}
