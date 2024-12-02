'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateClient } from '@aws-amplify/api';
import type { Schema } from '@/amplify/data/resource';
import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json'

Amplify.configure(outputs)

interface CarFormData {
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  description: string;
  image?: string;
  photos?: string[];
  fuelType?: "GASOLINE" | "DIESEL" | "ELECTRIC" | "HYBRID" | "PLUGIN_HYBRID" | "OTHER";
  transmission?: "AUTOMATIC" | "MANUAL" | "CVT" | "SEMI_AUTOMATIC";
  bodyType?: "SEDAN" | "SUV" | "COUPE" | "TRUCK" | "VAN" | "WAGON" | "CONVERTIBLE" | "OTHER";
  exteriorColor: string;
}

export default function CreateListingForm() {
  const router = useRouter();
  const client = generateClient<Schema>();
  
  const [formData, setFormData] = useState<CarFormData>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    location: '',
    description: '',
    exteriorColor: '',
    image: '',
    photos: [],
    fuelType: undefined,
    transmission: undefined,
    bodyType: undefined
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: newListing } = await client.models.CarListing.create({
        ...formData,
        year: parseInt(formData.year.toString()),
        price: parseFloat(formData.price.toString()),
        mileage: parseFloat(formData.mileage.toString()),
      },
    {authMode: 'userPool'});

      if (newListing) {
        router.push('/search');
      }
    } catch (error) {
      console.error('Error creating car listing:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create New Car Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-2">
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  placeholder="Enter car make"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="Enter car model"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exteriorColor">Exterior Color</Label>
                <Input
                  id="exteriorColor"
                  name="exteriorColor"
                  value={formData.exteriorColor}
                  onChange={handleInputChange}
                  placeholder="Enter exterior color"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min={1900}
                  max={new Date().getFullYear() + 1}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min={0}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage</Label>
                <Input
                  type="number"
                  id="mileage"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  min={0}
                  required
                />
              </div>

              {/* Dropdowns */}
              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select
                  value={formData.fuelType}
                  onValueChange={(value) => handleSelectChange(value, 'fuelType')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GASOLINE">Gasoline</SelectItem>
                    <SelectItem value="DIESEL">Diesel</SelectItem>
                    <SelectItem value="ELECTRIC">Electric</SelectItem>
                    <SelectItem value="HYBRID">Hybrid</SelectItem>
                    <SelectItem value="PLUGIN_HYBRID">Plug-in Hybrid</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select
                  value={formData.transmission}
                  onValueChange={(value) => handleSelectChange(value, 'transmission')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AUTOMATIC">Automatic</SelectItem>
                    <SelectItem value="MANUAL">Manual</SelectItem>
                    <SelectItem value="CVT">CVT</SelectItem>
                    <SelectItem value="SEMI_AUTOMATIC">Semi-Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bodyType">Body Type</Label>
                <Select
                  value={formData.bodyType}
                  onValueChange={(value) => handleSelectChange(value, 'bodyType')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SEDAN">Sedan</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="COUPE">Coupe</SelectItem>
                    <SelectItem value="TRUCK">Truck</SelectItem>
                    <SelectItem value="VAN">Van</SelectItem>
                    <SelectItem value="WAGON">Wagon</SelectItem>
                    <SelectItem value="CONVERTIBLE">Convertible</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter vehicle description"
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Listing
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
