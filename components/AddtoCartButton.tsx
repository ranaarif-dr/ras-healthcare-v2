"use client";
import React from "react";
import { Button } from "./ui/button";
import { useCart } from "./providers/CartContext";
import { Product } from "@/types/appwrite.types";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const AddtoCartButton = ({ product, className, ref }: { product: Product, className?: string , ref?: React.RefObject<HTMLButtonElement> }) => {
  const { addToCart, cart } = useCart();
  const isInCart = cart.some((item) => item.$id === product.$id);
  return (
    <>
      {isInCart ? (
        <Button className={className ? className : "w-full"} asChild variant={"outline"} ref={ref}>
          <Link href={"/cart"}>Visit Cart</Link>
        </Button>
      ) : (
        <Button
          onClick={() => addToCart(product, 1)}
          ref={ref}
          className={`w-full gap-2 ${className}`}
        //   variant={""}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      )}
    </>
  );
};

export default AddtoCartButton;
