'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageCarouselProps {
  images: string[];
  title: string;
}

export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-96 sm:h-[500px] bg-gray-200 dark:bg-slate-800 rounded-lg overflow-hidden group">
      <Image
        src={images[currentIndex]}
        alt={`${title} - Photo ${currentIndex + 1}`}
        fill
        className="object-cover"
      />

      {/* Previous Button */}
      <Button
        size="icon"
        variant="ghost"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={goToPrevious}
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </Button>

      {/* Next Button */}
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={goToNext}
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Count */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
