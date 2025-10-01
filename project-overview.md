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