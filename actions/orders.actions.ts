"use server";
import {
  DATABASE_ID,
  databases,
  ORDERS_COLLECTION_ID,
  PRODUCTS_COLLECTION_ID,
} from "@/lib/appwrite";
import { parseStringify } from "@/lib/utils";
import { CreateOrderProps } from "@/types";
import { ID, Query } from "node-appwrite";
import { sendOrderConfirmationEmail } from "./mail.actions";
import { Order } from "@/types/appwrite.types";
import { getProductById } from "@/app/admin/_actions/product";
import { revalidatePath } from "next/cache";
export const createOrder = async (orderData: CreateOrderProps) => {
  try {
    const order = await databases.createDocument(
      DATABASE_ID!,
      ORDERS_COLLECTION_ID!,
      ID.unique(),
      {
        customer_name: orderData.customer_name,
        customer_phone: orderData.customer_phone,
        customer_email: orderData.customer_email,
        delivery_address: orderData.delivery_address,
        delivery_city: orderData.delivery_city,
        delivery_state: orderData.delivery_state,
        price: orderData.price,
        number_of_items: orderData.number_of_items,
        order_items: orderData.order_items,
        status: "pending",
        couponApplied: orderData.couponApplied,
        coupon: orderData.coupon_code,
        discountedPrice: orderData.discountedPrice,
        postalCode: orderData.postalCode,
      }
    );

    await sendOrderConfirmationEmail(order as Order);
    revalidatePath("/admin/orders");
    revalidatePath("/");
    revalidatePath("/orders");
    return parseStringify(order);
  } catch (error) {
    console.log("Error while Creating order: ", error);
  }
};

export const getAllOrders = async () => {
  try {
    const orders = await databases.listDocuments(
      DATABASE_ID!,
      ORDERS_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    return parseStringify(orders.documents);
  } catch (error) {
    console.log("Error while fetching all orders: ", error);
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const order = await databases.getDocument(
      DATABASE_ID!,
      ORDERS_COLLECTION_ID!,
      orderId
    );

    return parseStringify(order);
  } catch (error) {
    console.log("error while fetching the order by Id: ", error);
  }
};

export const updateOrderStatus = async (
  orderId: string,
  status: "pending" | "confirmed" | "shipped" | "cancelled" | "completed"
) => {
  try {
    if (status === "confirmed") {
      const order = await getOrderById(orderId);
      const products = JSON.parse(order.order_items);

      // Use Promise.all to handle multiple updates concurrently
      await Promise.all(
        // @ts-ignore
        products.map(async (element) => {
          const product = await getProductById(element.productId);
          if (product) {
            return databases.updateDocument(
              DATABASE_ID!,
              PRODUCTS_COLLECTION_ID!,
              element.productId,
              {
                stock: String(product.stock - 1),
              }
            );
          }
        })
      );
    }

    // Update order status
    const order = await databases.updateDocument(
      DATABASE_ID!,
      ORDERS_COLLECTION_ID!,
      orderId,
      {
        status,
      }
    );
    revalidatePath("/admin/orders");
    revalidatePath("/");
    revalidatePath("/orders");

    return parseStringify(order);
  } catch (error) {
    console.log("error while updating the order status: ", error);
    throw error; // Re-throw error for proper error handling
  }
};
