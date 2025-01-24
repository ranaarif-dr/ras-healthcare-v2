import { getAllProducts, getProductById } from "@/app/admin/_actions/product";
import ProductDetails from "@/components/ProductDetails";
import ProductList from "@/components/ProductList";
import React from "react";

const ProductDetailsPage = async ({
  params,
}: {
  params: any;
}) => {
    const { productId } = await params;
    const products = await getAllProducts()
    const refinedProducts = products.documents.filter(
        // @ts-ignore
      (product) => product.$id !== productId
    );
  const product = await getProductById(productId);
  return (
    <div className="container mx-auto">
      <ProductDetails product={product} />
      <ProductList label="Related Products" products={refinedProducts} />
    </div>
  );
};

export default ProductDetailsPage;
