# Aarti Silver Arts Website

A premium full-stack website for a traditional silver manufacturing business in Jaipur, India.

## Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Admin auth: JWT-based lightweight login

## Project Structure

```text
client/   React frontend
server/   Express API and MongoDB models
```

## Local Setup

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Configure environment variables

Copy the example env files and update them with your real values.

Frontend:

```bash
copy client\.env.example client\.env
```

Backend:

```bash
copy server\.env.example server\.env
```

Important backend values:

- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `USE_IN_MEMORY_DB=true` if you want to run locally without an installed MongoDB server
- `OWNER_EMAIL` for inquiry notifications
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` for email delivery

### Email notifications

The custom inquiry form can email the owner after saving the inquiry.

Common setup:

- Gmail SMTP host: `smtp.gmail.com`
- Port: `587`
- `SMTP_SECURE=false`
- Use your email as `SMTP_USER`
- Use an app password as `SMTP_PASS`
- Set `OWNER_EMAIL` to the inbox that should receive inquiries

## Run the project

Start the backend:

```bash
npm run dev:server
```

Start the frontend in a second terminal:

```bash
npm run dev:client
```

Frontend default URL: `http://localhost:5173`

Backend default URL: `http://localhost:5000`

## Production Build

```bash
npm run build
```

## Backend Tests

```bash
npm run test:server
```

## Notes

- The site ships with seeded sample products if the database is empty.
- Gallery, testimonial, and business content are stored in frontend config files for quick editing.
- Contact details and WhatsApp information live in `client/src/config/business.js`.
- Product images are URL-based in v1. Admin can add or edit image URLs from the dashboard.
