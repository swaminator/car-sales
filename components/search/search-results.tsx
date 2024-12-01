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

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

// Configure Amplify
Amplify.configure(outputs);
const client = generateClient<Schema>();

export function SearchResults() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState("price-asc");
  const [listings, setListings] = useState<Array<Schema["CarListing"]["type"]>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const query = searchParams.get("q") || "";

  
  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        // Fetch all car listings
        const {data, errors} = await client.models.CarListing.list();
        
        setListings(data);
        // console log  if there is an error in returning the list data from CarListing.list()
        if (errors) {
          console.log("Error fetching listings:", errors);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []); // Empty dependency array means this runs once on component mount

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
                {isLoading ? "Loading..." : `${filteredListings.length} vehicles found`}
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
    
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="text-muted-foreground">Loading vehicles...</p>
              </div>
            </div>
          ) : listings.length === 0 ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <p className="text-lg text-muted-foreground">No vehicles found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search criteria
                </p>
              </div>
            </div>
          ) : (
            <>
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
    
              <div className="grid gap-6">
                {filteredListings.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">
                      No results found for {query}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Try searching with different terms
                    </p>
                  </div>
                ) : (
                  <ResultsView cars={filteredListings} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
    
}