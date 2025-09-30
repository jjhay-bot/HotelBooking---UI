# Migrating to HTTP-only Cookies for Authentication

This guide explains how to move from using sessionStorage for JWT/auth data to using secure HTTP-only cookies, improving your app’s security.

---

## Why Use HTTP-only Cookies?

- HTTP-only cookies cannot be accessed by JavaScript, protecting tokens from XSS attacks.
- The backend sets and reads the cookie; the frontend never sees the token directly.

---

## What Needs to Change?

### 1. Backend Changes

- On login, set a cookie with the JWT using the `Set-Cookie` header.
- Use these cookie flags: `HttpOnly; Secure; SameSite=Strict` (or `Lax`).
- All protected API endpoints should read the JWT from the cookie, not from an Authorization header.

#### ASP.NET Core Example

```csharp
// In your login controller action
var token = GenerateJwtToken(user); // your method to create the JWT
var cookieOptions = new CookieOptions
{
    HttpOnly = true,
    Secure = true, // only over HTTPS
    SameSite = SameSiteMode.Strict, // or Lax
    Expires = DateTimeOffset.UtcNow.AddDays(1)
};
Response.Cookies.Append("token", token, cookieOptions);
return Ok(new { success = true });
```

```csharp
// To read the token in a controller or middleware:
var token = Request.Cookies["token"];
// Validate and use the token as needed
```

### 2. Frontend Changes

- Remove all code that sets/gets JWT or user role from sessionStorage.
- On login, POST credentials to the backend and let it set the cookie.
- For authenticated requests, add `credentials: 'include'` to fetch/axios calls so cookies are sent.
- To check if a user is authenticated, call a backend endpoint (e.g., `/me`) that returns user info if the cookie is valid.

---

## Example Implementation

### Frontend (React Example)

```js
// On login
await fetch('/api/login', {
  method: 'POST',
  body: JSON.stringify({ username, password }),
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include' // <--- important!
});

// For all API calls
await fetch('/api/protected', {
  credentials: 'include'
});
```

- Remove all `sessionStorage.setItem("jwt", ...)` and similar code.

---

## How to Check Auth State?

- Create a `/me` endpoint on the backend that returns user info if the cookie is valid.
- On the frontend, call `/me` on app load to check if the user is logged in and get their role.

---

## What to Remove in Your Code

- All `sessionStorage.setItem("jwt", ...)` and `sessionStorage.getItem("jwt")`
- All manual token attachment in fetch/axios headers
- All direct user role checks from sessionStorage

---

## Additional Security Tips

- Always use HTTPS in production.
- Implement CSRF protection for state-changing requests.
- Regularly audit dependencies and sanitize user input.

---

Add more notes as you implement or discover new best practices.
