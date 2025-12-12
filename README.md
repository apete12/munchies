# Restaurant Discovery App

A Next.js application for browsing and filtering restaurants.

## Features

- Browse all restaurants
- Filter by categories
- Server-side caching (5 minutes)
- Responsive design

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- REST API proxy pattern

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```
API_URL=your_api_url_here
```

3. Run development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── api/              # API routes (proxy to external API)
├── features/         # Feature modules
│   └── restaurant-dashboard/
├── lib/              # Utilities (API client)
└── page.tsx          # Home page
```

## API Routes

- `GET /api/restaurants` - Get all restaurants
- `GET /api/filter` - Get all filters
