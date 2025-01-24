"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddtoCartButton from "./AddtoCartButton";
import { Product } from "@/types/appwrite.types";
import { Star } from "lucide-react";
import Link  from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface ProductShowcaseProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  benefits: string[];
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  product: Product;
}

export default function ProductShowcase({
  imageSrc,
  imageAlt,
  title,
  benefits,
  price,
  originalPrice,
  inStock,
  product,
}: ProductShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll(".animate-item");
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <Card ref={containerRef} className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-1/3 animate-item">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={300}
              height={300}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <div className="flex justify-between items-start animate-item">
              <h2 className="text-2xl font-bold tracking-tight text-primary">
                {title}
              </h2>
              <Badge className="rounded-full" variant={inStock ? "default" : "secondary"}>
                {inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            <div className="flex items-center space-x-2 animate-item">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(5)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground">
                ({20} reviews)
              </span>
            </div>
            <ul className="space-y-2 animate-item">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-green-500 flex-shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-end gap-2 animate-item">
              <span className="text-3xl font-bold text-primary">
                Rs. {price}
              </span>
              {originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  Rs. {originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 animate-item">
              <AddtoCartButton className="flex-1" product={product} />
              <Button variant="outline" className="flex-1" asChild>
                <Link href={`/products/${product.name}/${product.$id}`}>Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
