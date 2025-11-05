# Car Sales App

## Overview
A modern car sales experience built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui. The application allows shoppers to discover, compare, and evaluate vehicles through a polished and highly interactive interface.

## Table of Contents
- Overview
- Features
- Architecture Snapshot
- Project Structure
- Getting Started
- Available Scripts
- Quality & Tooling
- Roadmap
- Design Principles
- Technology Stack

## Features

- **Search & Discovery** – Global search by make, model, or keyword with autocomplete, search history, and curated popular searches. Empty queries fall back to a complete inventory browse.
- **Filtering & Sorting** – Rich filters for make, model, year, price, mileage, body, fuel, and location combined with sorting options for price, year, mileage, and distance.
- **Flexible Results Views** – Responsive list layout ready for both list and future map integrations. Sorting and view toggles are surfaced directly within the results view.
- **Vehicle Detail Experience** – Full photo gallery with fullscreen mode, spec breakdowns, pricing insights, location details, highlights, and a long-form description.
- **Customer Engagement Flows** – Dealer contact dialog, UI-only test drive scheduler, and save-search interactions designed for quick conversion.
- **Navigation Continuity** – Seamless back navigation between search, results, and detail pages to keep shoppers oriented.

## Architecture Snapshot

Key UI modules that compose the experience:

1. **SearchInput** (`components/search/search-input.tsx`)
   - Command palette–style entry with autocomplete and search history support.
2. **ResultsView** (`components/search/results-view.tsx`)
   - Orchestrates layout switching, responsive grid, and sort controls.
3. **CarCard** (`components/search/car-card.tsx`)
   - Condensed vehicle preview with key stats and hover states.
4. **CarDetail** (`components/cars/car-detail.tsx`)
   - Full detail page including gallery, specs, and contact actions.
5. **PhotoGallery** (`components/cars/photo-gallery.tsx`)
   - Carousel gallery with thumbnail navigation and fullscreen support.

Representative listing interface:

```typescript
interface CarListing {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  image: string;
  fuelType: string;
  transmission: string;
  bodyType: string;
  exteriorColor: string;
  vin: string;
}
```

## Project Structure

```
app/
  page.tsx              # Landing experience
  search/page.tsx       # Search & results surface
  cars/[id]/page.tsx    # Vehicle detail route
components/
  search/               # Search, filters, and results modules
  cars/                 # Detail experience components
  ui/                   # Reusable shadcn/ui primitives
lib/                    # Constants and utilities
types/                  # Shared TypeScript definitions
```

## Getting Started

1. **Prerequisites** – Node.js 18+ and npm.
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the development server**
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3000` to explore the app.

For production builds, run `npm run build` followed by `npm start`.

## Available Scripts

- `npm run dev` – Start the Next.js development server.
- `npm run build` – Create an optimized production build.
- `npm start` – Serve the production build.
- `npm run lint` – Execute Next.js linting with the configured ESLint ruleset.

## Quality & Tooling

- **TypeScript-first** – Strong typing across components and utilities.
- **Tailwind CSS** – Utility-first styling with project-specific tokens.
- **shadcn/ui & Radix** – Accessible headless primitives for consistent UX.
- **ESLint** – Enforced via `npm run lint` to maintain code quality.

## Roadmap

- Account authentication and saved favorites.
- Conversational chatbot to assist with inventory discovery.
- End-to-end scheduling workflow for test drives.
- Checkout pipeline to complete vehicle reservations.
- Map view with dealer locations and review surfacing.

## Design Principles

- Clean, modern interface
- Responsive experience across devices
- Accessibility-first approach
- Progressive enhancement
- Performance-conscious rendering

## Technology Stack

- Next.js 13+
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons