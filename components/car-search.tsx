"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  MapIcon,
  ListIcon,
  BookmarkIcon,
  SlidersHorizontalIcon,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock data for demonstration
const MAKES = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Tesla'];
const YEARS = Array.from({ length: 30 }, (_, i) => 2024 - i);

interface CarListing {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  image: string;
}

const MOCK_LISTINGS: CarListing[] = [
  {
    id: 1,
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 45000,
    mileage: 12000,
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 2,
    make: 'BMW',
    model: 'M4',
    year: 2022,
    price: 65000,
    mileage: 15000,
    location: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 3,
    make: 'Mercedes',
    model: 'C300',
    year: 2021,
    price: 42000,
    mileage: 28000,
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=500',
  },
];

export default function CarSearch() {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [listings] = useState<CarListing[]>(MOCK_LISTINGS);

  const saveCurrentSearch = () => {
    const searchName = `Search ${savedSearches.length + 1}`;
    setSavedSearches([...savedSearches, searchName]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Find Your Perfect Car</h1>
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
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Make</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        {MAKES.map((make) => (
                          <SelectItem key={make} value={make.toLowerCase()}>
                            {make}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Year</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {YEARS.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price Range</label>
                    <div className="pt-4">
                      <Slider
                        defaultValue={[0, 100000]}
                        max={100000}
                        step={1000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>${priceRange[0].toLocaleString()}</span>
                        <span>${priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input type="text" placeholder="Enter ZIP code or city" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="list" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger
                  value="list"
                  onClick={() => setView('list')}
                  className="flex items-center gap-2"
                >
                  <ListIcon className="w-4 h-4" />
                  List View
                </TabsTrigger>
                <TabsTrigger
                  value="map"
                  onClick={() => setView('map')}
                  className="flex items-center gap-2"
                >
                  <MapIcon className="w-4 h-4" />
                  Map View
                </TabsTrigger>
              </TabsList>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="year-desc">Year: Newest First</SelectItem>
                  <SelectItem value="mileage-asc">Mileage: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="list" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((car) => (
                  <Card key={car.id} className="overflow-hidden">
                    <img
                      src={car.image}
                      alt={`${car.year} ${car.make} ${car.model}`}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold">
                        {car.year} {car.make} {car.model}
                      </h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-2xl font-bold text-primary">
                          ${car.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {car.mileage.toLocaleString()} miles
                        </p>
                        <p className="text-sm text-gray-500">{car.location}</p>
                      </div>
                      <Button className="w-full mt-4">View Details</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="map" className="mt-0">
              <div className="bg-gray-100 rounded-lg h-[600px] flex items-center justify-center">
                <p className="text-gray-500">Map view coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}