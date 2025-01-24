"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "./providers/CartContext";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src={"/ras-logo.svg"}
                alt="ras logo"
                height={30}
                width={150}
                className="object-contain"
              />
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/">
                <Button
                  variant="linkHover2"
                  className="px-3 py-2 text-sm font-medium"
                >
                  Home
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="linkHover2"
                  className="px-3 py-2 text-sm font-medium"
                >
                  About
                </Button>
              </Link>

              <Link href="/blog">
                <Button
                  variant="linkHover2"
                  className="px-3 py-2 text-sm font-medium"
                >
                  Blog
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="linkHover2"
                  className="px-3 py-2 text-sm font-medium"
                >
                  Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="linkHover2"
                  className="px-3 py-2 text-sm font-medium"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side icons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Button variant="ghost" asChild size="icon" className="relative">
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-blue-500 text-white text-xs">
                    {cart?.length || 0}
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                  {isOpen ? (
                    <X className="block h-6 w-6" />
                  ) : (
                    <Menu className="block h-6 w-6" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side={"right"}
                className="bg-white shadow-lg"
                // size="full"
                onCloseAutoFocus={(event) => event.preventDefault()}
              >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Link href="/">
                    <Button
                      variant="linkHover2"
                      className="block px-3 py-2 text-base font-medium"
                    >
                      Home
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button
                      variant="linkHover2"
                      className="block px-3 py-2 text-base font-medium"
                    >
                      Products
                    </Button>
                  </Link>
                  <Link href="/blog">
                    <Button
                      variant="linkHover2"
                      className="block px-3 py-2 text-base font-medium"
                    >
                      Blog
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      variant="linkHover2"
                      className="block px-3 py-2 text-base font-medium"
                    >
                      About us
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="linkHover2"
                      className="block px-3 py-2 text-base font-medium"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-5">
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="relative"
                    >
                      <Link href="/cart">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-blue-500 text-white text-xs">
                          {cart?.length || 0}
                        </span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
