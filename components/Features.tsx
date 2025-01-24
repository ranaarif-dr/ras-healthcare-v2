import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Users } from "lucide-react";
import Link from "next/link";

export default function SupplementServices() {
  return (
    <div className="grid gap-6 md:grid-cols-2 p-4 md:p-6 max-w-6xl mx-auto">
      <Card className="bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-800">
            Looking for Nutritional Supplements?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-4">
            <ShoppingBag className="w-8 h-8 text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold">
                Place Your Order, and We&apos;ll Deliver it to Your Doorstep!
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Share your supplement needs, and we&apos;ll deliver trusted,
                high-quality nutrients — tested and approved for your health
                goals.
              </p>
            </div>
          </div>
          <Button className="w-full" asChild>
            <Link href={"/products"}>See Products</Link>
          </Button>
        </CardContent>
      </Card>
      <Card className="bg-blue-600 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Need Personalized Health Advice?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-4">
            <Users className="w-8 h-8 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold">
                Get Expert Guidance from Certified Wellness Professionals!
              </h3>
              <p className="text-sm text-blue-100 mt-2">
                Book an online consultation and receive tailored recommendations
                on the best supplements to enhance your well-being.
              </p>
            </div>
          </div>
          <Button variant="secondary" asChild className="w-full">
            <Link href={"/contact"}>Ask Now</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
