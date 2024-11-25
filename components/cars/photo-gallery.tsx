"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PhotoGalleryProps {
  photos: string[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const previousPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative group">
      {/* Main Gallery View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        <div className="md:col-span-3 relative aspect-video">
          <img
            src={photos[currentIndex]}
            alt={`Photo ${currentIndex + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowFullscreen(true)}
          >
            <Expand className="h-4 w-4" />
          </Button>
        </div>
        <div className="hidden md:grid grid-rows-3 gap-4">
          {photos.slice(0, 3).map((photo, index) => (
            <div
              key={index}
              className={`relative aspect-video cursor-pointer transition-opacity ${
                index === currentIndex ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={photo}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={previousPhoto}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={nextPhoto}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Fullscreen Dialog */}
      <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
        <DialogTrigger asChild>
          <span className="sr-only">View fullscreen</span>
        </DialogTrigger>
        <DialogContent className="max-w-7xl w-full h-[90vh]">
          <div className="relative w-full h-full">
            <img
              src={photos[currentIndex]}
              alt={`Photo ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={previousPhoto}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={nextPhoto}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}