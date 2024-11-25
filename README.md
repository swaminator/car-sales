# Car Sales App Documentation

## Overview
A modern car sales application built with Next.js, TypeScript, and shadcn/ui. The app allows users to search, filter, and browse vehicle listings with a clean, professional interface.

## Implemented Features

### 1. Search Functionality
- **Global Search**
  - Search by make, model, or keyword
  - Autocomplete suggestions
  - Popular searches
  - Empty search support (view all vehicles)

### 2. Search Results
- **Sorting Options**
  - Price (Low to High/High to Low)
  - Year (Newest/Oldest First)
  - Mileage (Low to High/High to Low)
  - Distance (Nearest First)

- **View Options**
  - List view with detailed cards
  - Map view (placeholder for future implementation)

### 3. Filtering System
- **Available Filters**
  - Make and Model
  - Year Range
  - Price Range
  - Mileage Range
  - Body Type
  - Fuel Type
  - Location

### 4. Vehicle Details
- **Comprehensive Information**
  - Photo gallery with fullscreen mode
  - Vehicle specifications
  - Pricing details
  - Location information
  - Vehicle highlights
  - Detailed description

- **Interactive Features**
  - Image gallery navigation
  - Contact dealer dialog
  - Test drive scheduling (UI only)
  - Save search functionality (UI only)

### 5. Navigation
- Back to search from results
- Back to results from vehicle details
- Clear navigation paths throughout the app

## Technical Implementation

### Key Components

1. **SearchInput (`components/search/search-input.tsx`)**
   - Command palette style search interface
   - Autocomplete suggestions
   - Search history support

2. **ResultsView (`components/search/results-view.tsx`)**
   - Toggleable list/map views
   - Responsive grid layout
   - Sorting functionality

3. **CarCard (`components/search/car-card.tsx`)**
   - Vehicle preview cards
   - Key information display
   - Interactive hover states

4. **CarDetail (`components/cars/car-detail.tsx`)**
   - Detailed vehicle information
   - Photo gallery
   - Contact forms
   - Specifications display

5. **PhotoGallery (`components/cars/photo-gallery.tsx`)**
   - Interactive image gallery
   - Fullscreen mode
   - Thumbnail navigation

### Data Structure

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

## Features to be added

1. Add auth to save my favorites

2. Add a chatbot to search listings

3. Schedule a test drive

4. Checkout flow

5. Map view implementation

   - Dealer reviews

## Design Principles

- Clean, modern interface
- Responsive design
- Accessibility-first approach
- Progressive enhancement
- Performance optimization

## Technology Stack

- Next.js 13+
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons