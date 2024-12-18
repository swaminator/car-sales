"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ResultsView } from "@/components/search/results-view";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, SlidersHorizontalIcon, ArrowLeft } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS } from "@/lib/constants";
import type { CarListing } from "@/types/car";

// Mock data for demonstration
const MOCK_LISTINGS: CarListing[] = [
  {
    id: 1,
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 45000,
    mileage: 12000,
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=500",
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "Sedan",
    exteriorColor: "Red",
    vin: "ABC123XYZ"
  },
  {
    id: 2,
    make: "BMW",
    model: "M4",
    year: 2022,
    price: 65000,
    mileage: 15000,
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=500",
    fuelType: "Gasoline",
    transmission: "Automatic",
    bodyType: "Coupe",
    exteriorColor: "Black",
    vin: "DEF456UVW"
  },
  {
    id: 3,
    make: "Mercedes",
    model: "C300",
    year: 2021,
    price: 42000,
    mileage: 28000,
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=500",
    fuelType: "Gasoline",
    transmission: "Automatic",
    bodyType: "Sedan",
    exteriorColor: "Silver",
    vin: "GHI789RST"
  }
];

export function SearchResults() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState("price-asc");
  const [listings, setListings] = useState(MOCK_LISTINGS);
  const query = searchParams.get("q") || "";

  const handleSort = (value: string) => {
    setSortBy(value);
    const sortedListings = [...listings].sort((a, b) => {
      switch (value) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "year-desc":
          return b.year - a.year;
        case "year-asc":
          return a.year - b.year;
        case "mileage-asc":
          return a.mileage - b.mileage;
        case "mileage-desc":
          return b.mileage - a.mileage;
        default:
          return 0;
      }
    });
    setListings(sortedListings);
  };

  const saveCurrentSearch = () => {
    // In a real app, this would save to a database or local storage
    console.log("Saving search:", { query, sortBy });
  };

  const filteredListings = query
    ? listings.filter(car => 
        car.make.toLowerCase().includes(query.toLowerCase()) ||
        car.model.toLowerCase().includes(query.toLowerCase()) ||
        `${car.year}`.includes(query)
      )
    : listings;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-4xl font-bold text-gray-900">
                {query ? `Results for "${query}"` : "All Vehicles"}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {filteredListings.length} vehicles found
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={saveCurrentSearch}
              className="flex items-center gap-2"
            >
              <BookmarkIcon className="w-4 h-4" />
              Save Search
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontalIcon className="w-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Search Filters</SheetTitle>
                  <SheetDescription>
                    Refine your car search with detailed filters
                  </SheetDescription>
                </SheetHeader>
                {/* Filter controls would go here */}
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <Select value={sortBy} onValueChange={handleSort}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ResultsView cars={filteredListings} />
      </div>
    </div>
  );
}