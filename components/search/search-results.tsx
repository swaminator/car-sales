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
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


Amplify.configure(outputs);

const client = generateClient<Schema>();

type Filters = {
  make: string;
  model: string;
  yearMin: number;
  yearMax: number;
  priceMin: number;
  priceMax: number;
  mileageMin: number;
  mileageMax: number;
  location: string;
};



// Mock data for demonstration
const MOCK_LISTINGS = [
  {
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    description: "Test",
    price: 45000,
    mileage: 12000,
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=500",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    bodyType: "SEDAN",
    exteriorColor: "Red",
    vin: "ABC123XYZ"
  },
  {
    make: "BMW",
    model: "M4",
    year: 2022,
    description: "Test",
    price: 65000,
    mileage: 15000,
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=500",
    fuelType: "GASOLINE",
    transmission: "AUTOMATIC",
    bodyType: "COUPE",
    exteriorColor: "Black",
    vin: "DEF456UVW"
  },
  {
    make: "Mercedes",
    model: "C300",
    year: 2021,
    description: "Test",
    price: 42000,
    mileage: 28000,
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=500",
    fuelType: "GASOLINE",
    transmission: "AUTOMATIC",
    bodyType: "SEDAN",
    exteriorColor: "Silver",
    vin: "GHI789RST"
  }
];
export function SearchResults() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState("price-asc");
  const [listings, setListings] =  useState<Array<Schema["CarListing"]["type"]>>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Inside your component:
  const [filters, setFilters] = useState<Filters>({
    make: "",
    model: "",
    yearMin: 2010,
    yearMax: new Date().getFullYear() + 1,
    priceMin: 0,
    priceMax: 100000,
    mileageMin: 0,
    mileageMax: 500000,
    location: "",
  });
  const query = searchParams.get("q") || "";

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const filterConditions = [];
        
        if (query) {
          filterConditions.push({
            or: [
              { make: { contains: query } },
              { model: { contains: query } },
              { year: { eq: parseInt(query) || 0 } }
            ]
          });
        }
  
        if (filters.make && filters.make !== "any") {
          filterConditions.push({ make: { contains: filters.make } });
        }
        if (filters.model) {
          filterConditions.push({ model: { contains: filters.model } });
        }
        if (filters.location) {
          filterConditions.push({ location: { contains: filters.location } });
        }
        
        filterConditions.push({ 
          year: { 
            between: [filters.yearMin, filters.yearMax] as [number, number]
          } 
        });
        
        filterConditions.push({ 
          price: { 
            between: [filters.priceMin, filters.priceMax] as [number, number]
          } 
        });
        
        filterConditions.push({ 
          mileage: { 
            between: [filters.mileageMin, filters.mileageMax] as [number, number]
          } 
        });
        console.log("filterConditions")
        console.log(filterConditions);
        const {data, errors} = await client.models.CarListing.list();
        console.log("fetchlistings")
        console.log(errors);
        setListings(data);
      } catch (error) {
        console.log("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchListings();
  }, [query, filters]);
  

  function createMockdata() {
    console.log("Creating mock data");
    MOCK_LISTINGS.forEach((listing) => {
      client.models.CarListing.create({
        ...listing,
        fuelType: listing.fuelType as "ELECTRIC" | "GASOLINE" | "DIESEL" | "HYBRID" | "PLUGIN_HYBRID" | "OTHER",
        transmission: listing.transmission as "AUTOMATIC" | "MANUAL",
        bodyType: listing.bodyType as "SEDAN" | "SUV" | "COUPE" | "TRUCK" | "VAN" | "WAGON" | "CONVERTIBLE" | "OTHER"    });
  }, [])
  }

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

    const handleFilterChange = (key: keyof Filters, value: string | number | number[]) => {
      setFilters(prev => ({ ...prev, [key]: value }));
    };
    
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
              onClick={createMockdata}
              className="flex items-center gap-2"
            >
              <BookmarkIcon className="w-4 h-4" />
              Mock data
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontalIcon className="w-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Search Filters</SheetTitle>
                  <SheetDescription>
                    Refine your car search with detailed filters
                  </SheetDescription>
                </SheetHeader>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="make-model">
                    <AccordionTrigger>Make & Model</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="make">Make</Label>
                        <Select
                          value={filters.make}
                          onValueChange={(value) => handleFilterChange("make", value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select make" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any make</SelectItem>
                            <SelectItem value="Tesla">Tesla</SelectItem>
                            <SelectItem value="BMW">BMW</SelectItem>
                            <SelectItem value="Honda">Honda</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Input
                          id="model"
                          placeholder="Enter model..."
                          value={filters.model}
                          onChange={(e) => handleFilterChange("model", e.target.value)}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="year">
                    <AccordionTrigger>Year</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="yearMin">Min Year</Label>
                          <Input
                            id="yearMin"
                            type="number"
                            min="1900"
                            max={filters.yearMax}
                            value={filters.yearMin}
                            onChange={(e) => handleFilterChange("yearMin", parseInt(e.target.value))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="yearMax">Max Year</Label>
                          <Input
                            id="yearMax"
                            type="number"
                            min={filters.yearMin}
                            max={new Date().getFullYear() + 1}
                            value={filters.yearMax}
                            onChange={(e) => handleFilterChange("yearMax", parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="priceMin">Min Price</Label>
                          <Input
                            id="priceMin"
                            type="number"
                            min="0"
                            max={filters.priceMax}
                            value={filters.priceMin}
                            onChange={(e) => handleFilterChange("priceMin", parseInt(e.target.value))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="priceMax">Max Price</Label>
                          <Input
                            id="priceMax"
                            type="number"
                            min={filters.priceMin}
                            value={filters.priceMax}
                            onChange={(e) => handleFilterChange("priceMax", parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="mileage">
                    <AccordionTrigger>Mileage</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="mileageMin">Min Mileage</Label>
                          <Input
                            id="mileageMin"
                            type="number"
                            min="0"
                            max={filters.mileageMax}
                            value={filters.mileageMin}
                            onChange={(e) => handleFilterChange("mileageMin", parseInt(e.target.value))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mileageMax">Max Mileage</Label>
                          <Input
                            id="mileageMax"
                            type="number"
                            min={filters.mileageMin}
                            value={filters.mileageMax}
                            onChange={(e) => handleFilterChange("mileageMax", parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="location">
                    <AccordionTrigger>Location</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="Enter location..."
                          value={filters.location}
                          onChange={(e) => handleFilterChange("location", e.target.value)}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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