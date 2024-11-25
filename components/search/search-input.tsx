"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";

const POPULAR_SEARCHES = [
  { id: 1, type: "make", label: "Tesla" },
  { id: 2, type: "make", label: "BMW" },
  { id: 3, type: "model", label: "Model 3" },
  { id: 4, type: "model", label: "X5" },
  { id: 5, type: "keyword", label: "Electric" },
  { id: 6, type: "keyword", label: "SUV" },
];

export function SearchInput() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set("q", searchTerm.trim());
    }
    setOpen(false);
    router.push(`/search${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="w-full max-w-2xl justify-start text-left h-14 text-muted-foreground text-lg bg-white/90 backdrop-blur-sm"
      >
        <Search className="mr-2 h-5 w-5" />
        Search by make, model, or keyword...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Search cars</DialogTitle>
        <CommandInput 
          placeholder="Type to search or press Enter to browse all" 
          value={query}
          onValueChange={setQuery}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(query);
            }
          }}
        />
        <CommandList>
          <CommandEmpty>
            <div className="py-6 text-center text-sm">
              <p>No results found.</p>
              <Button 
                variant="link" 
                className="mt-2"
                onClick={() => handleSearch("")}
              >
                View all vehicles
              </Button>
            </div>
          </CommandEmpty>
          <CommandGroup heading="Popular Searches">
            {POPULAR_SEARCHES.map((item) => (
              <CommandItem
                key={item.id}
                value={item.label}
                onSelect={() => handleSearch(item.label)}
                className="flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {item.type}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup>
            <CommandItem
              onSelect={() => handleSearch("")}
              className="justify-center text-primary"
            >
              Browse all vehicles
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}