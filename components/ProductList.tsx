import { Product } from "@/types/appwrite.types";
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({label, products}: {label: string, products: Product[]}) => {
  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-5">{label}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 place-items-center">
        {products.map((product) => (
            <ProductCard product={product} key={product.$id} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
