import React from 'react';
import { Heart, Target, Eye, ShieldCheck } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">About Us</h1>
          <p className="text-xl leading-relaxed text-gray-700 max-w-4xl mx-auto">
            At Ras Healthcare, we believe that the foundation of a nation&apos;s progress lies in good nutrition.
            For over a decade, we&apos;ve combined the latest research, technology, and high-quality ingredients to meet diverse nutritional needs.

            Our goal? To make healthy living simple, empowering you to live your best life and achieve your dreams.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <Heart className="text-red-500 w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Our Philosophy</h2>
            </div>
            <p className="text-gray-600 text-center">
              With people living longer than ever, maintaining good mental and physical health is essential for a fulfilling life.
              We are committed to providing safe, high-quality products that support your wellness journey.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Eye className="text-blue-500 w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Vision</h2>
            </div>
            <p className="text-gray-600 text-center">
              We blend the power of nature with cutting-edge technology to enhance human life, empowering people to thrive and prosper.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Target className="text-green-500 w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Mission</h2>
            </div>
            <p className="text-gray-600 text-center">
              We are a consumer-focused, science-driven company. Through continuous innovation, we optimize our products to meet evolving needs.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <ShieldCheck className="text-yellow-500 w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Quality Reassurance</h2>
            </div>
            <p className="text-gray-600 text-center">
              We adhere to strict CGMP standards for every batch, ensuring transparency and safety. Our products contain exactly what is listed—no more, no less.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
