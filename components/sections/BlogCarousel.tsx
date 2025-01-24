"use client";

import React, { useEffect, useState } from "react";
import BlogCard from "../BlogCard";
import { Button } from "../ui/button";
import { Blog as BlogType } from "@/types/appwrite.types";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface BlogProps {
  blogs: BlogType[];
}

const Blog: React.FC<BlogProps> = ({ blogs }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay()]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = React.useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = React.useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 hero overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Latest from Our Blog
        </h2>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {blogs.map((blog: BlogType) => (
                <div
                  key={blog.$id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_33.33%] px-4"
                >
                  <BlogCard blog={blog} type="user" />
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white transition-colors rounded-r-full p-2"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white transition-colors rounded-l-full p-2"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </Button>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {scrollSnaps.map((_, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className={`w-2 h-2 rounded-full p-0 ${
                index === selectedIndex ? "bg-primary" : "bg-gray-300"
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            <Link href={"/blog"}>View All Blog Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
