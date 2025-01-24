"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "../_components/Product-card";
import Link from "next/link";
import { getAllProducts } from "../_actions/product";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/appwrite.types";

// Mock data for products

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;
  console.log(data);
  const filteredProducts =
    data?.documents?.filter((product: Product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Products</h1>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
          <Link href="/admin/products/create">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm border-blue-200 focus:border-blue-400 focus:ring-blue-400"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: Product) => (
            <ProductCard key={product.$id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
