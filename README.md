# Educational Platform Web App
A full-featured educational web application built with React, offering multi-role access for students, admins, and organizations. The app supports OAuth sign-up, course material management, announcements, and profile handling with verification flows.

## Features
## Authentication
- Email & Password Sign-Up with backend token authentication
- Google OAuth Sign-In integration
- Real-time feedback and error handling during auth
- Email verification messages post-signup

## Admin and Organization Dashboard
- Manage organization admins
- View and add subdomains
- Protected routes based on token access

## Course Management
- View search results for available courses
- See detailed course admins dynamically fetched via API
- Filtered course rendering based on material or announcement context

## Announcements & Materials
- View similar announcements via SimilarAnnouncementCard
- Download and preview similar materials with dynamic file handling
- Automatic download handling for PDF or other formats

## User Profile
- View WhatsApp and Facebook info
- Role display (admin or not)
- Request profile verification
- Edit profile navigation

## Tech Stack
- Frontend: React.js, React Router, Context API
- Backend Communication: Axios
- Authentication: Token-based (Django Rest Framework assumed)
- Styling: Custom CSS
- Storage: Local storage-based token management
