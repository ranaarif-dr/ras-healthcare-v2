import React from "react";
import { getAllProducts } from "@/app/admin/_actions/product";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductSlider from "../ProductSlider";

const FeaturedProducts = async () => {
  const products = await getAllProducts();
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Products
        </h2>
<ProductSlider products={products.documents}/>

      </div>
    </section>
  );
};


export default FeaturedProducts;
