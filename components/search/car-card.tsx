import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fuel, Calendar, Gauge } from "lucide-react";
import type { CarListing } from "@/types/car";

interface CarCardProps {
  car: CarListing;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <Link href={`/cars/${car.id}`} className="block group">
      <Card className="overflow-hidden h-full transition-shadow hover:shadow-lg">
        <div className="relative">
          <img
            src={car.image}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-2 right-2">
            {car.bodyType}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">
            {car.year} {car.make} {car.model}
          </h3>
          <p className="text-2xl font-bold text-primary mb-4">
            ${car.price.toLocaleString()}
          </p>
          
          <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Fuel className="w-4 h-4" />
              {car.fuelType}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {car.year}
            </div>
            <div className="flex items-center gap-1">
              <Gauge className="w-4 h-4" />
              {car.mileage.toLocaleString()} mi
            </div>
            <div className="flex items-center gap-1">
              {car.transmission}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {car.location}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}