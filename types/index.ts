export interface CreateProductParams {
  name: string;
  price: number;
  description: string;
  images: string[];
  quantity: number;
  benefits: string[];
}
export interface CreateOrderProps {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  delivery_address: string;
  delivery_city: string;
  delivery_state: string;
  price: number;
  number_of_items: number;
  order_items: string;
  couponApplied: boolean;
  coupon_code: string;
  discountedPrice: number;
  status: "pending" | "confirmed" | "shipped" | "completed" | "cancelled";
  postalCode: string;
}

export interface CreateBlogProps {
  title: string;
  content: string;
  coverImage: File[] | string | string[] | undefined;
  slug: string;
}
