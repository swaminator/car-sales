import { SearchInput } from "@/components/search/search-input";
import { FeaturedCategories } from "@/components/search/featured-categories";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="relative isolate min-h-[70vh] overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-hero-pattern bg-cover bg-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-black/60"
        />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-center space-y-8 px-6 py-24 text-center text-white">
          <h1 className="text-4xl font-bold md:text-6xl">
            Find Your Dream Car Today
          </h1>
          <p className="text-xl text-gray-200">
            Search through thousands of cars from trusted dealers across the country
          </p>
          <div className="w-full max-w-2xl">
            <SearchInput />
          </div>
          <Link href="/search" className="inline-block">
            <Button size="lg" className="mt-4">
              Advanced Search
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

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