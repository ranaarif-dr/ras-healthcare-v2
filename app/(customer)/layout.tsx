import WhatsAppButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/components/providers/CartContext";
import Topbar from "@/components/Topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <CartProvider>
        <Topbar />
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <WhatsAppButton />
        <Footer />
      </CartProvider>
    </div>
  );
}
