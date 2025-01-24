// OrderDetailsDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Order } from "@/types/appwrite.types";
import { useState } from "react";
import { updateOrderStatus } from "@/actions/orders.actions";
import { toast } from "sonner";

interface OrderDetailsDialogProps {
  order: Order;
}

export default function OrderDetailsDialog({ order }: OrderDetailsDialogProps) {
  const subtotal = order.price;
  const total = order.discountedPrice;
  const discount = order.couponApplied ? subtotal - total : 0;
  const [selectedStatus, setSelectedStatus] = useState<
    "pending" | "confirmed" | "shipped" | "cancelled" | "completed"
  >(order.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async () => {
    try {
      setIsUpdating(true);
      const response = await updateOrderStatus(order.$id, selectedStatus);
      if (response) {
        console.log("Order status updated successfully");
        toast.success("Order status updated successfully");
      } else {
        console.log("Failed to update order status");
      }
    } catch (error) {
        console.log("Error while updating order status: ", error);
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Customer Information</h3>
            <div className="space-y-1">
              <p>Name: {order.customer_name}</p>
              <p>Email: {order.customer_email}</p>
              <p>Phone: {order.customer_phone}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Delivery Information</h3>
            <div className="space-y-1">
              <p>Address: {order.delivery_address}</p>
              <p>City: {order.delivery_city}</p>
              <p>State: {order.delivery_state}</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Order Summary</h3>
            <div className="text-sm text-muted-foreground">
              <p>Order ID: {order.$id}</p>
              <p>Date: {format(new Date(order.$createdAt), "PPP")}</p>
              <p>Total Items: {order.number_of_items}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Order Items</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {JSON.parse(order.order_items).map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>Rs. {item.price.toFixed(2)}</TableCell>
                  <TableCell>Rs. {item.totalPrice.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex flex-col items-end">
            <div className="space-y-2">
              <p>Subtotal: Rs. {subtotal.toFixed(2)}</p>
              {order.couponApplied && (
                <>
                  <p className="text-green-600">
                    Coupon Applied: {order.coupon?.code}
                  </p>
                  <p className="text-green-600">
                    Discount: Rs. {discount.toFixed(2)}
                  </p>
                </>
              )}
              <p>Delivery Charges: Rs. 200</p>
              <p className="font-bold text-lg">Total: Rs. {total.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div>
            <h3 className="font-semibold mb-2">Order Status</h3>
            <div className="flex gap-4 items-center">
              <Select
            //   @ts-ignore
                onValueChange={(value) => setSelectedStatus(value)}
                defaultValue={order.status}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleStatusChange}
                variant="default"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Status"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
