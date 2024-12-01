"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhotoGallery } from "@/components/cars/photo-gallery";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Calendar,
  Fuel,
  Gauge,
  MapPin,
  Palette,
  Settings,
  ShieldCheck,
} from "lucide-react";
import type { CarListing } from "@/types/car";
import type { Schema } from '@/amplify/data/resource';
interface CarDetailProps {
  car: Schema["CarListing"]["type"];
  }


export function CarDetail({ car }: CarDetailProps) {
  const [showContactDialog, setShowContactDialog] = useState(false);

  const highlights = [
    { icon: Calendar, label: "Year", value: car.year },
    { icon: Gauge, label: "Mileage", value: `${car.mileage.toLocaleString()} mi` },
    { icon: Fuel, label: "Fuel Type", value: car.fuelType },
    { icon: Settings, label: "Transmission", value: car.transmission },
    { icon: Palette, label: "Color", value: car.exteriorColor },
    { icon: MapPin, label: "Location", value: car.location },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/search">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold">
              {car.year} {car.make} {car.model}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{car.bodyType}</Badge>
              <Badge variant="outline">{car.location}</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo Gallery */}
            {/* <PhotoGallery photos={car.photos} /> */}

            {/* Vehicle Highlights */}
            <div>
          <img 
            src={car?.image || ""}  
          />
          <br />
              <h2 className="text-2xl font-semibold mb-4">Vehicle Highlights</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-4 bg-muted rounded-lg"
                  >
                    <item.icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {car.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6 bg-card p-6 rounded-lg border">
              <div className="space-y-2">
                <p className="text-3xl font-bold">${car.price.toLocaleString()}</p>
                <p className="text-muted-foreground">Plus taxes and fees</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span>Vehicle protection plans available</span>
                </div>
                
                <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full">
                      Get Started
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact Information</DialogTitle>
                      <DialogDescription>
                        Our team will reach out to you shortly to discuss the next steps.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-6">
                      <p className="text-center text-muted-foreground">
                        For demonstration purposes only. In a real application, this would contain a contact form.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full">
                  Schedule Test Drive
                </Button>
              </div>

              <Separator />

              <div className="text-sm text-muted-foreground">
                <p>Contact us for:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Trade-in options</li>
                  <li>Financing details</li>
                  <li>Extended warranty</li>
                  <li>Additional questions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}