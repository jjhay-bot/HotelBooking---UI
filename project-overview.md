# Project Overview: Hotel Booking System Web Application

## Introduction
A fully functional hotel booking system built with C# (backend) and HTML, CSS, JavaScript (frontend). This project simulates a real-world booking process, allowing users to explore rooms and complete reservations.

## Technologies Used
- Backend: C#
- Frontend: HTML, CSS, JavaScript
- Styling: Bootstrap/Tailwind CSS (if used)
- Data Storage: JSON/localStorage/other

## Key Features Implemented
1. **User Authentication and Registration**
   - Secure account creation and login
2. **Responsive Design**
   - Mobile-friendly interface
3. **Home Page**
   - Welcome banner, hotel branding, navigation bar
4. **Room Listings**
   - Room name/type, description, price, amenities, availability
5. **Filter/Search Available Rooms**
   - Search by room type, price range, or availability
6. **Booking Page**
   - Booking form (guest info, room type, dates)
   - Cost calculation
7. **Booking Summary**
   - Confirmation with guest/booking details and cost breakdown
8. **Admin Page**
   - View/manage all bookings, user and room details

## Walkthrough Outline
1. **Introduction**
   - Briefly introduce the project and its purpose
2. **Login/Registration Demo**
   - Show user registration and login process
3. **Home Page Tour**
   - Highlight branding and navigation
4. **Room Listings and Search**
   - Demonstrate browsing rooms and using filters/search
5. **Booking Process**
   - Fill out booking form, select dates, view cost calculation
6. **Booking Confirmation**
   - Show summary and cost breakdown
7. **Admin Interface**
   - Display admin page for managing/viewing bookings
8. **Additional Features (if any)**
   - Showcase any extra enhancements

## Instructions to Run the Project
- Prerequisites (e.g., .NET SDK, browser)
- Steps to build and run backend
- How to open frontend

## Conclusion
Summarize the project, its features, and your learning outcomes.

---

## Route & Feature Reference (Frontend)

### Main Routes & Features

1. **/** — SplashScreen (Hotel banner and logo)
   - Initial loading/branding screen. Improves first impression and user experience.
2. **/explore** — Landing Page
   - Main home page; shows hotel branding, navigation, and featured rooms.
3. **/room/:id** — Room Details
   - Displays details for a specific room (name, type, description, price, amenities, availability).
4. **/login** — Login Page
   - User authentication. Security: only registered users can book or access personal/admin features.
5. **/register** — Registration Page
   - User account creation. Security: enables personalized bookings and admin/user management.
6. **/contact** — Contact Us
   - Contact form or hotel contact info. Improves communication and support for users.
7. **/admin/bookings**, **/admin/users**, **/admin/rooms**, **/admin/dashboard** — Admin Dashboard
   - Admin interface for managing bookings, users, and rooms. Security and control: only admins can access, view, and manage sensitive data.
8. **/test** — UI Demo
   - Demo/testing of UI components. Development/testing utility.
9. **\*** — Not Found
   - Handles invalid routes. Improves UX by guiding users when they enter a wrong URL.

### Security & Safety Features
- **Authentication (Login, Register, AuthProvider):** Ensures only authorized users can book or access admin features.
- **JWT Authentication with HTTP-only Cookies:** Uses JSON Web Tokens stored in HTTP-only cookies for secure session management, protecting against XSS attacks and ensuring user credentials are never accessible via JavaScript.
- **Protected Admin Routes (ProtectedRoute adminOnly):** Restricts admin pages to authorized users, protecting sensitive data.
- **Error Boundary (ErrorBoundary):** Prevents app crashes and displays user-friendly error messages.
- **NotFound Route:** Prevents exposure of internal routes and improves navigation safety.

### How These Features Help
- **Security:** Authentication, protected routes, and error boundaries safeguard user data and admin controls.
- **Usability:** SplashScreen, Landing, Room Details, and NotFound routes guide users smoothly through the booking process.
- **Admin Control:** Dedicated admin dashboard routes allow for efficient management of bookings, users, and rooms.
- **Communication:** Contact page ensures users can reach out for help or inquiries.

---

## Suggestions for Additional Key Features
- **HTTP Cookies/Token-based Auth:** Store login/auth tokens in cookies or localStorage for persistent sessions and improved security.
- **Role-based Access Control:** Differentiate between admin and regular users for more granular permissions.
- **Booking History:** Allow users to view their past bookings.
- **Room Availability Calendar:** Visualize room availability for easier booking.
- **Email Notifications:** Send booking confirmations and reminders.
- **Data Validation:** Add more robust client-side and server-side validation for forms.
- **Audit Logs (Admin):** Track changes to bookings/users for security and troubleshooting.
- **Multi-language Support:** Make the app accessible to international users.

# Input Handling Terminology

- **Sanitize:** Remove or escape unwanted, dangerous, or invalid characters from input (e.g., strip `<`, `>`, `&` to prevent XSS/injection).
- **Normalize:** Convert input to a standard format for consistency (e.g., trim whitespace, lowercase email).
- **Validate:** Check if input meets required rules or formats (e.g., not empty, valid email, strong password).
- **Escape:** Convert special characters to safe representations (e.g., `&` to `&amp;`).
- **Encode:** Change data to a different format (e.g., URL encoding).
- **Parse:** Convert input from one format to another (e.g., string to number).
- **Clean:** General term for removing unwanted data.

Use these practices to ensure user input is safe, consistent, and correct before processing or storing it.

## Where to Use Escape, Parse, Clean, Encode

- **Escape:** When displaying user input in HTML (to prevent XSS), or in SQL queries (to prevent injection).
- **Parse:** When converting input types, e.g., string to number, parsing JSON, or dates.
- **Clean:** When removing unwanted data, such as extra spaces, invalid characters, or filtering out profanity.
- **Encode:** When sending data in URLs (`encodeURIComponent`), or encoding for storage/transmission.

These are used in:
- Form handling (before saving or displaying user input)
- API request/response processing
- Database operations
- Rendering data in the UI

Use these practices to keep your app secure, robust, and user-friendly.

## CORS vs CSRF vs Cookie Security

- **CORS (Cross-Origin Resource Sharing):** Controls which domains can access your backend/API from the browser. Prevents unauthorized websites from making requests to your API.
- **CSRF (Cross-Site Request Forgery):** Protects against unwanted actions performed by authenticated users via cross-site requests. Use CSRF tokens and SameSite cookies for protection.
- **Cookies (HttpOnly, Secure, SameSite):** Protect session/authentication data and help prevent XSS and CSRF. Configure these flags for best security.

CORS and CSRF are different protections, but both are needed for a secure cross-domain setup. Always configure both, along with secure cookies, for best results.

## Security Protections: Individual vs Combined

| Protection         | What It Protects Against         | Alone (Partial) | Combined (Strong) |
|--------------------|----------------------------------|-----------------|-------------------|
| CORS               | Unauthorized cross-origin access | ✔️ Blocks some attacks | ✔️ Strong with CSRF/cookies |
| CSRF Tokens        | Cross-site request forgery       | ✔️ Protects actions | ✔️ Strong with cookies/CORS |
| HttpOnly Cookies   | XSS, cookie theft                | ✔️ Protects from JS | ✔️ Strong with CSRF/CORS |
| Secure Cookies     | Network interception             | ✔️ Protects over HTTPS | ✔️ Strong with other flags |
| SameSite Cookies   | CSRF, cross-site requests        | ✔️ Blocks some CSRF | ✔️ Strong with CSRF tokens |
| Input Validation   | Injection, XSS                   | ✔️ Protects data/UI | ✔️ Strong with all above |

**Notes:**
- Each protection helps against specific threats, but combining them provides much stronger security.
- For best results, use all together: CORS, CSRF tokens, HttpOnly/Secure/SameSite cookies, and input validation.