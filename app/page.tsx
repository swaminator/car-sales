import { SearchInput } from "@/components/search/search-input";
import { FeaturedCategories } from "@/components/search/featured-categories";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div 
        className="min-h-[70vh] relative flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920")',
        }}
      >
        <div className="text-center space-y-8 p-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl mx-auto">
            Find Your Dream Car Today
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Search through thousands of cars from trusted dealers across the country
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchInput />
          </div>
          <Link href="/search" className="inline-block">
            <Button size="lg" className="mt-4">
              Advanced Search
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Browse by Category
        </h2>
        <FeaturedCategories />
      </div>

      {/* Trust Indicators */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">100K+</h3>
              <p className="text-muted-foreground">Cars Listed</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">50K+</h3>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">1000+</h3>
              <p className="text-muted-foreground">Trusted Dealers</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}