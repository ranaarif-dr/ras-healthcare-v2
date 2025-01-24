import React from "react";
import { Medal, FlaskConical, Truck } from "lucide-react";

const WhyUs = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose RAS Health Care?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Medal className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600">
              Our products are made with the highest quality ingredients.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FlaskConical className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Formulations</h3>
            <p className="text-gray-600">
              Developed by health professionals for optimal results.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nationwide Delivery</h3>
            <p className="text-gray-600">
              Fast and reliable shipping all over Pakistan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
