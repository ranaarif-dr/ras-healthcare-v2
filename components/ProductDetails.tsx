"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star, Plus, Minus, Check } from "lucide-react";
import Image from "next/image";
import { useCart } from "./providers/CartContext";
import { Product } from "@/types/appwrite.types";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cart } = useCart();

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 10));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const existingCartItem = cart.find((item) => item.$id === product.$id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1200px]">
      <div className="grid lg:grid-cols-[120px,1fr] gap-8">
        {/* Main Content Grid */}
        <div className="order-2 lg:order-1">
          {/* Left Column - Thumbnail Images */}
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-[80px] h-[80px] rounded-lg overflow-hidden border ${
                  selectedImage === index
                    ? "border-blue-500"
                    : "border-gray-200"
                } hover:border-blue-500 transition-colors`}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Center Column - Main Image and Details */}
        <div className="order-1 lg:order-2 space-y-8">
          <div className="grid lg:grid-cols-[1fr,400px] gap-8">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <div className="flex items-center mt-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(40 review)</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600">
                Rs. {Number(product.price).toFixed(2)}
              </div>

              <div className="flex items-center gap-4">
                {existingCartItem ? (
                  <>
                    <div className="flex items-center border rounded-full overflow-hidden bg-gray-50">
                      <span className="w-24 text-center">
                        In Cart: {existingCartItem.quantity}
                      </span>
                    </div>
                    <Button
                      className="flex-1 rounded-full bg-green-600 hover:bg-green-700"
                      onClick={() => (window.location.href = "/cart")}
                    >
                      View Cart
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center border rounded-full overflow-hidden bg-gray-50">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={decrementQuantity}
                        disabled={quantity === 1}
                        className="rounded-none"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={incrementQuantity}
                        disabled={quantity === 10}
                        className="rounded-none"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      className="flex-1 rounded-full bg-blue-600 hover:bg-blue-700"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                  </>
                )}
              </div>

              <div className="space-y-2 pt-4">
                {product.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Tabs Section */}
          <Card className="mt-8 border-none shadow-none">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 space-x-8 bg-white">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 px-0"
                >
                  DESCRIPTION
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 px-0"
                  disabled
                >
                  REVIEWS (40)
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-8">
                <div className="prose max-w-none text-gray-600">
                  <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-8">
                <div className="prose max-w-none text-gray-600">
                  <p>Customer reviews will be displayed here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
