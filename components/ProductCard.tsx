"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card } from "@/components/ui/card";
import { Product } from "@/types/appwrite.types";
import Image from "next/image";
import AddtoCartButton from "./AddtoCartButton";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const { name, price, images } = product;
  const cardRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const priceElement = priceRef.current;
    const buttonElement = buttonRef.current;

    if (!card || !priceElement || !buttonElement) return;

    const timeline = gsap.timeline({ paused: true });

    timeline
      .to(priceElement, {
        yPercent: -100,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        buttonElement,
        {
          yPercent: -100,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "-=0.3"
      );

    card.addEventListener("mouseenter", () => timeline.play());
    card.addEventListener("mouseleave", () => timeline.reverse());

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <Card
      ref={cardRef}
      className="group relative w-[300px] overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <Link href={`/products/${product.name}/${product.$id}`} >
        <div className="aspect-square overflow-hidden rounded-lg bg-white p-4">
          <Image
            src={images[0]}
            alt={name}
            width={300}
            height={300}
            className=" w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <div className="relative h-10 overflow-hidden">
          <div ref={priceRef} className="absolute w-full">
            <p className="text-xl font-bold text-gray-900">
              Rs. {Number(price).toFixed(2)}
            </p>
          </div>
          <div
            ref={buttonRef}
            className="absolute top-full w-full transform transition-transform"
          >
            <AddtoCartButton product={product} />
          </div>
        </div>
      </div>
    </Card>
  );
}
