import { PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function EmptyInventory() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-5 pt-7 pb-12">
      {/* Icon container */}
      <div className="bg-muted/50 mb-3 rounded-full p-3">
        <PackageOpen className="text-muted-foreground size-6" />
      </div>

      {/* Heading - keeping text-sm as per your system */}
      <h3 className="mb-1.5 text-sm font-semibold">No products found</h3>

      {/* Description */}
      <p className="text-muted-foreground mb-6 max-w-md text-center text-xs">
        Get started by adding your first product to the inventory
      </p>

      {/* Button */}
      <Button size="sm" asChild className="text-xs">
        <Link to="/products/add-product">Add Product</Link>
      </Button>
    </div>
  );
}
