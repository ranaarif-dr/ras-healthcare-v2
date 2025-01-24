import { Metadata } from "next";
import ContactForm from "./ContactForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Instagram,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our team",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-muted-foreground text-lg">
          We&apos;d love to hear from you. Get in touch with us.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="transform hover:scale-105 transition-transform duration-300">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary-foreground/10">
              <CardTitle className="text-2xl">Contact Information</CardTitle>
              <CardDescription className="text-base">
                Get in touch with us through various channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="flex items-center space-x-4 hover:bg-muted p-2 rounded-lg transition-colors duration-200">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-sm md:text-base">
                  74-C, First Floor, 10th Commercial Street Phase-4, D.H.A
                  Karachi.
                </span>
              </div>
              <div className="flex items-center space-x-4 hover:bg-muted p-2 rounded-lg transition-colors duration-200">
                <Phone className="h-6 w-6 text-primary" />
                <span className="text-sm md:text-base">+92-321-2012317</span>
              </div>
              <div className="flex items-center space-x-4 hover:bg-muted p-2 rounded-lg transition-colors duration-200">
                <Mail className="h-6 w-6 text-primary" />
                <a
                  href="mailto:info@rashealthcare.com.pk"
                  className="text-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  info@rashealthcare.com.pk
                </a>
              </div>
              <div className="flex items-center space-x-4 hover:bg-muted p-2 rounded-lg transition-colors duration-200">
                <MessageCircle className="h-6 w-6 text-primary" />
                <a
                  href="https://wa.me/923212012317"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  WhatsApp
                </a>
              </div>
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4 text-lg">Follow Us</h3>
                <div className="flex justify-center space-x-6">
                  <Link
                    href="https://www.facebook.com/share/UaavvK5fGnvmYS5e/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transform hover:scale-110 transition-all duration-200"
                  >
                    <Facebook className="h-7 w-7" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link
                    href="https://www.instagram.com/rashealthcarekhi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transform hover:scale-110 transition-all duration-200"
                  >
                    <Instagram className="h-7 w-7" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="transform hover:scale-105 transition-transform duration-300">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
