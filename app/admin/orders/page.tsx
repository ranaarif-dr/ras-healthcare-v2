"use client"

import { useQuery } from "@tanstack/react-query"
import { getAllOrders } from "@/actions/orders.actions"
import { OrdersDataTable } from "./_components/Order-Data-Table"

export default function OrderManagement() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Order Management</h1>
      <OrdersDataTable data={orders} />
    </div>
  )
}
