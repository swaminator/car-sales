"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CarCard } from "@/components/search/car-card";
import { MapIcon, ListIcon } from "lucide-react";
import type { CarListing } from "@/types/car";

interface ResultsViewProps {
  cars: CarListing[];
}

export function ResultsView({ cars }: ResultsViewProps) {
  const [view, setView] = useState<"list" | "map">("list");

  return (
    <Tabs defaultValue="list" className="w-full">
      <TabsList>
        <TabsTrigger
          value="list"
          onClick={() => setView("list")}
          className="flex items-center gap-2"
        >
          <ListIcon className="w-4 h-4" />
          List View
        </TabsTrigger>
        <TabsTrigger
          value="map"
          onClick={() => setView("map")}
          className="flex items-center gap-2"
        >
          <MapIcon className="w-4 h-4" />
          Map View
        </TabsTrigger>
      </TabsList>

      <TabsContent value="list" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="map" className="mt-6">
        <div className="bg-muted rounded-lg h-[600px] flex items-center justify-center">
          <p className="text-muted-foreground">
            Map view coming soon
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}