# Authentication: HTTP-only Cookies vs Session-based

## HTTP-only JWT Cookies (Stateless)
- Stores JWT in an HTTP-only cookie, inaccessible to JavaScript (protects against XSS).
- No server-side session storage required.
- Server validates JWT on each request.
- Scales easily for distributed systems and APIs.
- Logout is harder (must blacklist tokens or rely on expiration).
- Simpler implementation, less infrastructure.

## Session-based Authentication (Stateful)
- Stores a session ID in an HTTP-only cookie; user data is stored server-side.
- Requires session storage (memory, database, Redis, etc.).
- Server manages session lifecycle (creation, expiration, invalidation).
- Easier to force logout and revoke sessions instantly.
- More complex implementation, more infrastructure.
- Preferred for highly sensitive apps (banking, healthcare).

## Security Notes
- Both methods should use HTTP-only and Secure cookies.
- Both protect against XSS; only session-based protects against instant revocation.

## Recommendation
- For most web apps: HTTP-only cookies with JWT are secure and easy to implement.
- For apps needing maximum control: use session-based authentication.

---

*This summary was generated to help guide authentication choices for this project.*
