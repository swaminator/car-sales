import { Car, Truck, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORIES = [
  {
    icon: Car,
    title: "New Arrivals",
    description: "Browse the latest vehicles added to our inventory",
  },
  {
    icon: Zap,
    title: "Electric Vehicles",
    description: "Explore our selection of electric and hybrid cars",
  },
  {
    icon: Truck,
    title: "SUVs & Trucks",
    description: "Find the perfect vehicle for your lifestyle",
  },
];

export function FeaturedCategories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {CATEGORIES.map((category, index) => (
        <Card
          key={index}
          className="group hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        >
          <CardContent className="p-6">
            <div className="mb-4">
              <category.icon className="w-8 h-8 text-primary group-hover:text-primary/80 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
            <p className="text-muted-foreground">{category.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}