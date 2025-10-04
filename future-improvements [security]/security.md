# Security & Vulnerability Improvements

This document lists areas for future improvement regarding security and potential vulnerabilities in the project.

## 1. Authentication & Session Management
- Move JWT and session data from sessionStorage to HTTP-only, Secure cookies to prevent XSS token theft.
- Ensure logout and token refresh logic is robust and secure.

## 2. Authorization
- Enforce all sensitive authorization (admin/user) on the backend, not just in the frontend.
- Validate user roles and permissions server-side for all API endpoints.

## 3. XSS & Input Sanitization
- Sanitize all user input and escape output in the UI to prevent XSS.
- Implement a strong Content Security Policy (CSP) header.

## 4. API Security
- Never expose secrets, API keys, or sensitive data in the frontend code.
- Ensure all API endpoints require proper authentication and authorization.

## 5. Password Handling
- Never log or expose passwords in error messages or client logs.
- Enforce strong password requirements and secure password reset flows.

## 6. Token Expiry & Logout
- Automatically log out users or refresh tokens when JWTs expire or become invalid.

## 7. Dependency Management
- Regularly audit and update dependencies to patch known vulnerabilities.

---

Add more items as new issues or improvements are identified.
