"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  ShoppingBag,
  PackageOpen,
  Settings,
  LogOut,
  Menu,
  BookA,
  Ticket,
} from "lucide-react";
import { PinTopIcon } from "@radix-ui/react-icons";

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, disabled: false },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag, disabled: false },
  {
    name: "Products",
    href: "/admin/products",
    icon: PackageOpen,
    disabled: false,
  },
  { name: "Blog", href: "/admin/blog", icon: BookA, disabled: false },
  { name: "Top Bar", href: "/admin/topbar", icon: PinTopIcon, disabled: false },
  {
    name: "Coupon Codes",
    href: "/admin/coupan",
    icon: Ticket,
    disabled: false,
  },
  { name: "Settings", href: "/settings", icon: Settings, disabled: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed left-4 top-4 z-40 text-blue-600 hover:text-blue-800 border-blue-200 hover:bg-blue-50"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px] p-0">
          <SidebarContent pathname={pathname} setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>
      <aside className="hidden md:block fixed left-0 top-0 bottom-0 w-[240px] border-r border-blue-100 bg-white">
        <SidebarContent pathname={pathname} setIsOpen={setIsOpen} />
      </aside>
    </>
  );
}

function SidebarContent({
  pathname,
  setIsOpen,
}: {
  pathname: string;
  setIsOpen: (open: boolean) => void;
}) {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white">
      <div className="px-3 py-2 flex-1">
        <h2 className="mb-2 px-4 text-lg font-semibold text-blue-800">
          Admin Dashboard
        </h2>
        <div className="space-y-1">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <nav className="grid gap-1 px-2">
              {sidebarItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  <span
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium ",
                      !item.disabled &&
                        "hover:bg-blue-50 hover:text-blue-800 transition-colors",
                      item.disabled && "cursor-not-allowed opacity-80",
                      pathname === item.href
                        ? "bg-blue-100 text-blue-800"
                        : "text-gray-600"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.name}</span>
                  </span>
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </div>
      <div className="mt-auto p-4 mb-5">
        <Button
          variant="outline"
          className="w-full text-blue-600 hover:text-blue-800 border-blue-200 hover:bg-blue-50 "
          onClick={() => setIsOpen(false)}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );
}
