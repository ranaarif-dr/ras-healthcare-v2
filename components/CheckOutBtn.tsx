"use client"
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useCart } from "./providers/CartContext";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createOrder } from "@/actions/orders.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useMediaQuery } from "usehooks-ts";
import { ScrollArea } from "@/components/ui/scroll-area";
import OrderSummary  from "@/components/OrderSummary";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  postalCode: z.string().min(5, "Postal code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
});

export default function CheckoutDrawer() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">Checkout</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[80vh] pr-4">
            <CheckOutForm setOpen={setOpen} isDesktop={isDesktop} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full">Checkout</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="p-4 text-lg font-semibold">
          Checkout
        </DrawerTitle>
        <ScrollArea className="h-[80vh]">
          <CheckOutForm setOpen={setOpen} isDesktop={isDesktop} />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

const CheckOutForm = ({
  setOpen,
  isDesktop,
}: {
  setOpen: (open: boolean) => void;
  isDesktop: boolean;
}) => {
  const {
    clearCart,
    getTotalItems,
    getOrderItems,
    coupon,
    getTotalPrice,
  } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      state: "",
      country: "",
    },
  });

  const { total, subtotal } = getTotalPrice();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const orderPromise = createOrder({
        customer_name: values.fullName,
        customer_email: values.email,
        customer_phone: values.phone,
        delivery_address: values.address,
        delivery_city: values.city,
        delivery_state: values.state,
        price: subtotal,
        number_of_items: getTotalItems(),
        order_items: JSON.stringify(getOrderItems()),
        status: "pending",
        discountedPrice: total,
        couponApplied: coupon ? true : false,
        coupon_code: coupon ? coupon.$id : "",
        postalCode: values.postalCode,
      });

      toast.promise(orderPromise, {
        success: "Order Placed Successfully",
        loading: "Order is being placed",
        error: "Something went wrong",
      });

      const data = await orderPromise;
      clearCart();
      setOpen(false);
      router.push(`/success?orderId=${data.$id}`);
    } catch (error) {
      console.error("Error while creating order: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <OrderSummary
         isCheckout={true}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+92 300 1234567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="New York" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="10001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="NY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="United States" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? "Placing Order..." : "Place Order"}
            </Button>
            {isDesktop ? (
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            ) : (
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
