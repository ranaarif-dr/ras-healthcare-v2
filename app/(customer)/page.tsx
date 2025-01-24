import Hero from "@/components/sections/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WhyUs from "@/components/sections/WhyUs";
import Blog from "@/components/sections/Blog";
import SupplementServices from "@/components/Features";
import ProductShowcaselist from "@/components/ProductShowcaselist";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <Hero />
        <FeaturedProducts />
        <WhyUs />
        <ProductShowcaselist />
        <SupplementServices />
        <Blog />
      </main>
    </div>
  );
}
