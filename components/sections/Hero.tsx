"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const heroImages = Array.from({ length: 13 }, (_, i) => `/hero${i + 1}.jpeg`);

export default function FullScreenHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    bgRefs.current = bgRefs.current.slice(0, heroImages.length);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.to(bgRefs.current, { opacity: 0, duration: 1 });
    gsap.to(bgRefs.current[currentSlide], { opacity: 1, duration: 1 });

    return () => {
      gsap.killTweensOf(bgRefs.current);
    };
  }, [currentSlide]);

  return (
    <div className="relative w-full h-[56.25vw] min-h-[500px] max-h-[calc(100vh-64px)] overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) {
              bgRefs.current[index] = el;
            }
          }}
          className="absolute inset-0 opacity-0 transition-opacity duration-1000 ease-in-out"
        >
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            fill
            priority={index === 0}
            quality={75}
            sizes="100vw"
            className="object-cover object-center scale-[0.8]"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIRshGxsdIR0hHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
      ))}

      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full p-0 border-2 border-white transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-transparent hover:bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
