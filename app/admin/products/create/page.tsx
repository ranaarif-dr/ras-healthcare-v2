import AddProductForm from "../../_components/AddProductForm";
import BackButton from "@/components/BackButton";

export default function AddProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <AddProductForm />
    </div>
  );
}
