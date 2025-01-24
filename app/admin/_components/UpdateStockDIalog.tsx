import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateStock } from "../_actions/product";
import { useState } from "react";
import SubmitButton from "@/components/SubmitBtn";
const UpdateStockSchema = z.object({
  stock: z.string(),
});
export function UpdateStockDialog({
  children,
  productId,
  quantity,
}: {
  children: React.ReactNode;
  productId: string;
  quantity: string;
}) {
  const [isLoading, setisLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(UpdateStockSchema),
    defaultValues: {
      stock: Number(quantity).toFixed(0),
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateStockSchema>) => {
    setisLoading(true);
    try {
      const { stock } = data;
      await updateStock(productId, stock);
      setOpen(false);
    } catch (error) {
      console.log("error while submitting stock update form", error);
    }
    setisLoading(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Update Stock</DialogTitle>
        <DialogHeader>
          <DialogDescription>Update stock for this product</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="Stock" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <SubmitButton isLoading={isLoading}>Update Stock</SubmitButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
