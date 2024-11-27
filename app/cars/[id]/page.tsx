"use client";

import { notFound } from "next/navigation";
import { CarDetail } from "@/components/cars/car-detail";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { useParams } from "next/navigation";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

// Mock data - In a real app, this would come from an API
// const MOCK_LISTINGS: Record<number, CarListing & { description: string; photos: string[] }> = {
//   1: {
//     id: 1,
//     make: "Tesla",
//     model: "Model 3",
//     year: 2023,
//     price: 45000,
//     mileage: 12000,
//     location: "San Francisco, CA",
//     image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=500",
//     fuelType: "Electric",
//     transmission: "Automatic",
//     bodyType: "Sedan",
//     exteriorColor: "Red",
//     vin: "ABC123XYZ",
//     description: "This Tesla Model 3 is in excellent condition and comes with the latest Autopilot features. The vehicle has been meticulously maintained and includes the Premium Interior package with heated seats, premium audio system, and glass roof. Perfect for both daily commuting and long-distance travel, this electric vehicle offers an impressive range and cutting-edge technology.",
//     photos: [
//       "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=1200",
//       "https://images.unsplash.com/photo-1684952068116-f0fb5e54c741?auto=format&fit=crop&q=80&w=1200",
//       "https://images.unsplash.com/photo-1684952067974-905c0e0d3920?auto=format&fit=crop&q=80&w=1200",
//       "https://images.unsplash.com/photo-1684952068393-561f7c3e76f0?auto=format&fit=crop&q=80&w=1200"
//     ]
//   },
//   2: {
//     id: 2,
//     make: "BMW",
//     model: "M4",
//     year: 2022,
//     price: 65000,
//     mileage: 15000,
//     location: "Los Angeles, CA",
//     image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=500",
//     fuelType: "Gasoline",
//     transmission: "Automatic",
//     bodyType: "Coupe",
//     exteriorColor: "Black",
//     vin: "DEF456UVW",
//     description: "This BMW M4 represents the perfect blend of luxury and performance. Featuring the Competition Package, this vehicle delivers an exhilarating driving experience with its twin-turbo engine and sophisticated suspension system. The pristine black exterior is complemented by a premium leather interior and the latest BMW technology features.",
//     photos: [
//       "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200",
//       "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=1200",
//       "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200",
//       "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=1200"
//     ]
//   },
//   3: {
//     id: 3,
//     make: "Mercedes-Benz",
//     model: "C300",
//     year: 2021,
//     price: 42000,
//     mileage: 28000,
//     location: "New York, NY",
//     image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=500",
//     fuelType: "Gasoline",
//     transmission: "Automatic",
//     bodyType: "Sedan",
//     exteriorColor: "Silver",
//     vin: "GHI789RST",
//     description: "This Mercedes-Benz C300 exemplifies German engineering and luxury. The vehicle comes equipped with the Premium Package, including a panoramic sunroof, heated seats, and the latest MBUX infotainment system. The smooth ride and elegant interior make it perfect for both city driving and long journeys.",
//     photos: [
//       "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200",
//       "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200",
//       "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200",
//       "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=1200"
//     ]
//   }
// };
type CarListing = Schema["CarListing"]["type"];


export default function CarDetailPage({ params }: { params: { id: string } }) {
  const [car, setCar] = useState<CarListing | null>(null);
  const [loading, setLoading] = useState(true);
  const client = generateClient<Schema>();

  useEffect(() => {
    async function fetchCar() {
      try {
        const { data: listing, errors } = await client.models.CarListing.get({
          id: params.id
        });
        if (listing) {
          setCar(listing);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Error fetching car:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    
    fetchCar();
  }, [params.id, client.models.CarListing]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>;
  }

  if (!car) {
    notFound();
  }

  return <CarDetail car={car} />;
}
