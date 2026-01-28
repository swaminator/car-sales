"use client";

import { useEffect, useState } from "react";
import { useSearchParams, type ReadonlyURLSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BODY_TYPES, FUEL_TYPES, MAKES, YEARS } from "@/lib/constants";

const DEFAULT_PRICE_RANGE: [number, number] = [0, 150000];
const DEFAULT_MILEAGE_RANGE: [number, number] = [0, 200000];

export type FiltersState = {
  make: string;
  model: string;
  minYear: string;
  maxYear: string;
  priceRange: [number, number];
  mileageRange: [number, number];
  bodyType: string;
  fuelType: string;
  location: string;
};

export interface FiltersProps {
  onFilterChange: (filters: FiltersState) => void;
}

const parseNumberParam = (value: string | null, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getInitialFilters = (searchParams: ReadonlyURLSearchParams): FiltersState => ({
  make: searchParams.get("make") || "",
  model: searchParams.get("model") || "",
  minYear: searchParams.get("minYear") || "",
  maxYear: searchParams.get("maxYear") || "",
  priceRange: [
    parseNumberParam(searchParams.get("minPrice"), DEFAULT_PRICE_RANGE[0]),
    parseNumberParam(searchParams.get("maxPrice"), DEFAULT_PRICE_RANGE[1]),
  ],
  mileageRange: [
    parseNumberParam(searchParams.get("minMileage"), DEFAULT_MILEAGE_RANGE[0]),
    parseNumberParam(searchParams.get("maxMileage"), DEFAULT_MILEAGE_RANGE[1]),
  ],
  bodyType: searchParams.get("bodyType") || "",
  fuelType: searchParams.get("fuelType") || "",
  location: searchParams.get("location") || "",
});

export function Filters({ onFilterChange }: FiltersProps) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FiltersState>(() =>
    getInitialFilters(searchParams)
  );

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const updateFilter = <Key extends keyof FiltersState>(
    key: Key,
    value: FiltersState[Key]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      make: "",
      model: "",
      minYear: "",
      maxYear: "",
      priceRange: DEFAULT_PRICE_RANGE,
      mileageRange: DEFAULT_MILEAGE_RANGE,
      bodyType: "",
      fuelType: "",
      location: "",
    });
  };

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <Label>Make</Label>
        <Select
          value={filters.make || "any"}
          onValueChange={(value) =>
            updateFilter("make", value === "any" ? "" : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select make" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any make</SelectItem>
            {MAKES.map((make) => (
              <SelectItem key={make} value={make}>
                {make}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Model</Label>
        <Input
          value={filters.model}
          onChange={(event) => updateFilter("model", event.target.value)}
          placeholder="Search model"
        />
      </div>

      <div className="space-y-2">
        <Label>Year Range</Label>
        <div className="grid grid-cols-2 gap-4">
          <Select
            value={filters.minYear || "any"}
            onValueChange={(value) =>
              updateFilter("minYear", value === "any" ? "" : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Min year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {YEARS.map((year) => (
                <SelectItem key={`min-${year}`} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.maxYear || "any"}
            onValueChange={(value) =>
              updateFilter("maxYear", value === "any" ? "" : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Max year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {YEARS.map((year) => (
                <SelectItem key={`max-${year}`} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="pt-4">
          <Slider
            value={filters.priceRange}
            max={DEFAULT_PRICE_RANGE[1]}
            step={1000}
            onValueChange={(value) =>
              updateFilter("priceRange", [value[0], value[1]])
            }
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>${filters.priceRange[0].toLocaleString()}</span>
            <span>${filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Mileage Range</Label>
        <div className="pt-4">
          <Slider
            value={filters.mileageRange}
            max={DEFAULT_MILEAGE_RANGE[1]}
            step={1000}
            onValueChange={(value) =>
              updateFilter("mileageRange", [value[0], value[1]])
            }
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>{filters.mileageRange[0].toLocaleString()} mi</span>
            <span>{filters.mileageRange[1].toLocaleString()} mi</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Body Type</Label>
        <Select
          value={filters.bodyType || "any"}
          onValueChange={(value) =>
            updateFilter("bodyType", value === "any" ? "" : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select body type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any body type</SelectItem>
            {BODY_TYPES.map((bodyType) => (
              <SelectItem key={bodyType} value={bodyType}>
                {bodyType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Fuel Type</Label>
        <Select
          value={filters.fuelType || "any"}
          onValueChange={(value) =>
            updateFilter("fuelType", value === "any" ? "" : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select fuel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any fuel type</SelectItem>
            {FUEL_TYPES.map((fuelType) => (
              <SelectItem key={fuelType} value={fuelType}>
                {fuelType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <Input
          value={filters.location}
          onChange={(event) => updateFilter("location", event.target.value)}
          placeholder="City or ZIP code"
        />
      </div>

      <Button variant="outline" className="w-full" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  );
}