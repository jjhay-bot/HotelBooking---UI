# Authentication Usage

## How to Check Authentication and Role

Use the `useAuth` hook from your AuthContext in any component:

```js
import { useAuth } from "@/context/AuthContext";

const { user } = useAuth();

const isAuthenticated = !!user;
const isAdmin = user?.role === "admin";
```

- No need for sessionStorage or separate hooks/utilities.
- All authentication logic is centralized in AuthContext.
- All API calls should use `credentials: 'include'` and rely on HTTP-only cookies.

---
*SessionStorage usage has been removed from the codebase. Use context and cookies only.*
