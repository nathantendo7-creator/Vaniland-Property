# Vaniland - Real Estate Management Platform

Vaniland is a modern, high-performance real estate management platform built with React, TypeScript, and Vite. It features a seamless property search experience, administrative dashboard, and lead management system.

## Features

- **Property Listings:** Comprehensive property search and filtering system.
- **Admin Dashboard:** Manage listings, view customer leads, and track feedback.
- **Interactive Maps:** Visual property locations using Leaflet.
- **Responsive Design:** Optimized for both mobile and desktop experiences.
- **Lead Generation:** Automated capture of property inquiries and customer feedback.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, GSAP
- **Backend:** Node.js, Express, tsx
- **Storage:** Local JSON-based CMS (seeded from `seed/seed-properties.json`)

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd vaniland
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Add your `GEMINI_API_KEY` and `APP_URL`

### Running Locally

To start the full stack (Vite + Express Server):

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Scripts

- `npm run dev`: Starts the server and Vite middleware.
- `npm run build`: Compiles the frontend for production.
- `npm run test`: Executes core logic tests.
- `npm run lint`: Checks for TypeScript errors.

## License

Private - All rights reserved.
