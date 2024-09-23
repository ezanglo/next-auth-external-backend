# Next.js Auth.js External Backend Example

This project demonstrates how to set up Auth.js (formerly NextAuth.js) with an external backend using the credentials provider in a Next.js application.

## Features

- Next.js 14 with App Router
- Auth.js v5 (Beta) integration
- Credentials provider for custom authentication
- External backend API integration
- Protected routes with middleware
- API routes for client-side requests

## Getting Started

First, run the development server:
bash
npm run dev
or
yarn dev
or
pnpm dev
or
bun dev



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the Next.js application pages and API routes
- `components/`: Reusable React components
- `lib/`: Utility functions and custom hooks
- `types/`: TypeScript type definitions
- `auth.ts`: Auth.js configuration
- `middleware.ts`: Next.js middleware for protecting routes
- `api/`: API routes for handling client-side requests

## Authentication Flow

1. User submits login credentials
2. Credentials are validated against the external API
3. Upon successful authentication, a session is created
4. Protected routes are accessible only to authenticated users

## API Routes

The project includes API routes to handle client-side requests. These routes act as a backend for the Next.js application, allowing you to perform server-side operations and interact with external services.

Key API routes:
- `/api/auth/[...nextauth]`: Handles Auth.js authentication
- `/api/posts`: Manages blog posts (example of a protected resource)

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Auth.js Documentation](https://authjs.dev/)