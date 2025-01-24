"use client"

import { useState, useEffect } from "react"
import { Coupon, getCoupons, createCoupon, updateCoupon, deleteCoupon } from "@/actions/coupon.actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { format } from "date-fns"

export default function CouponManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCoupons()
  }, [])

  const fetchCoupons = async () => {
    setIsLoading(true)
    try {
      const fetchedCoupons = await getCoupons()
      setCoupons(fetchedCoupons)
    } catch (error) {
      toast("Failed to fetch coupons")
      console.error("Error fetching coupons:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const couponData = {
      code: formData.get("code") as string,
      description: formData.get("description") as string,
      discount_type: formData.get("discount_type") as "percentage" | "fixed",
      discount_value: Number(formData.get("discount_value")),
      valid_from: formData.get("valid_from") as string,
      valid_until: formData.get("valid_until") as string,
      usage_limit: Number(formData.get("usage_limit")) || undefined,
      is_active: formData.get("is_active") === "on",
    }

    try {
      if (editingCoupon) {
        await updateCoupon(editingCoupon.$id!, couponData)
        toast("Coupon updated successfully")
      } else {
        await createCoupon(couponData)
        toast("Coupon created successfully")
      }
      setIsDialogOpen(false)
      setEditingCoupon(null)
      fetchCoupons()
    } catch (error) {
      toast(editingCoupon ? "Failed to update coupon" : "Failed to create coupon")
      console.error("Error saving coupon:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      try {
        await deleteCoupon(id)
        toast("Coupon deleted successfully")
        fetchCoupons()
      } catch (error) {
        toast("Failed to delete coupon")
        console.error("Error deleting coupon:", error)
      }
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Coupon Management</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setEditingCoupon(null)}>Create New Coupon</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCoupon ? "Edit Coupon" : "Create New Coupon"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="code">Code</Label>
              <Input id="code" name="code" defaultValue={editingCoupon?.code} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" defaultValue={editingCoupon?.description} />
            </div>
            <div>
              <Label htmlFor="discount_type">Discount Type</Label>
              <Select name="discount_type" defaultValue={editingCoupon?.discount_type || "percentage"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select discount type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="discount_value">Discount Value</Label>
              <Input
                id="discount_value"
                name="discount_value"
                type="number"
                defaultValue={editingCoupon?.discount_value}
                required
              />
            </div>
            <div>
              <Label htmlFor="valid_from">Valid From</Label>
              <Input
                id="valid_from"
                name="valid_from"
                type="datetime-local"
                defaultValue={editingCoupon?.valid_from}
                required
              />
            </div>
            <div>
              <Label htmlFor="valid_until">Valid Until</Label>
              <Input
                id="valid_until"
                name="valid_until"
                type="datetime-local"
                defaultValue={editingCoupon?.valid_until}
                required
              />
            </div>
            <div>
              <Label htmlFor="usage_limit">Usage Limit</Label>
              <Input
                id="usage_limit"
                name="usage_limit"
                type="number"
                defaultValue={editingCoupon?.usage_limit}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="is_active" name="is_active" defaultChecked={editingCoupon?.is_active} />
              <Label htmlFor="is_active">Active</Label>
            </div>
            <Button type="submit">
              {editingCoupon ? "Update Coupon" : "Create Coupon"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <p>Loading coupons...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Valid From</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.$id}>
                <TableCell>{coupon.code}</TableCell>
                <TableCell>
                  {coupon.discount_type === "percentage"
                    ? `${coupon.discount_value}%`
                    : `${coupon.discount_value.toFixed(2)}`}
                </TableCell>
                <TableCell>{format(new Date(coupon.valid_from), "yyyy-MM-dd HH:mm")}</TableCell>
                <TableCell>{format(new Date(coupon.valid_until), "yyyy-MM-dd HH:mm")}</TableCell>
                <TableCell>
                  {coupon.used_count} / {coupon.usage_limit || "∞"}
                </TableCell>
                <TableCell>{coupon.is_active ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingCoupon(coupon)
                      setIsDialogOpen(true)
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(coupon.$id!)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
