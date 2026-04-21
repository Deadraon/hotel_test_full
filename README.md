# Taj View Residency – Full Stack Luxury Hotel Website

This is a production-ready, full-stack application for "Taj View Residency", a luxury hotel in Agra.

## Features

- **Modern Luxury UI**: Built with React, TailwindCSS, and Framer Motion for smooth animations and a premium feel.
- **Booking System**: Real-time price calculation, check-in/check-out validation, and backend storage.
- **Admin Dashboard**: Secure portal for hotel staff to manage bookings and view contact enquiries.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **SEO Optimized**: Meta tags, OpenGraph data, and semantic HTML.
- **WhatsApp Integration**: Direct booking button for real-time customer support.

## Project Structure

- `/frontend`: React + Vite application.
- `/backend`: Node.js + Express + MongoDB API.

## Local Setup

### 1. Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (one is already provided) and ensure your MongoDB is running or provide a connection string.
4. Start the server:
   ```bash
   node server.js
   ```

### 2. Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Admin Access
- **Login URL**: `/admin/login`
- **Setup**: You can use the `POST /api/auth/register` endpoint initially to create an admin account, or manually add one to your MongoDB database.

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub.
2. Import the repository to Vercel.
3. Set the root directory to `frontend`.
4. Set the build command to `npm run build` and output directory to `dist`.

### Backend (Render / Railway)
1. Import the repository.
2. Set the root directory to `backend`.
3. Add environment variables for `MONGODB_URI` and `JWT_SECRET`.
4. The server will automatically start using `node server.js`.

---
*Developed with luxury and precision for Taj View Residency.*
