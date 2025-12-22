import { useState } from "react";
import { Search, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import useAuth from "@/hooks/auth/useAuth";
import useGetQuery from "@/hooks/api/useGetQuery";

export default function ProductSelectionModal({
  isOpen,
  onClose,
  selectedProductIds = [],
  onConfirm,
}) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(selectedProductIds);

  const { data: products, isLoading } = useGetQuery({
    endpoint: `/product/store?storeId=6857bc3e4205851792ca088a`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["products-modal"],
    enabled: isOpen && !!user?.data?.clientid && !!user?.token,
  });

  const toggleProduct = (productId) => {
    setSelected((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleConfirm = () => {
    onConfirm(selected);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80dvh] max-w-2xl overflow-y-auto p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-base">Select Products</DialogTitle>
        </DialogHeader>

        <div className="border-b px-6 py-3">
          <div className="relative">
            <Search
              size={16}
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
            />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-9 text-sm"
            />
          </div>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground flex flex-col items-center gap-2">
                <Package size={32} className="animate-pulse" />
                <p className="text-sm">Loading products...</p>
              </div>
            </div>
          ) : products?.data?.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground text-center">
                <Package size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">No products found</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {products?.data?.map((product) => (
                <div
                  key={product._id}
                  onClick={() => toggleProduct(product._id)}
                  className={`hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                    selected.includes(product._id)
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <Checkbox
                    checked={selected.includes(product._id)}
                    onCheckedChange={() => toggleProduct(product._id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <img
                    src={product.thumbnailImage}
                    alt={product.productName}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-medium">
                      {product.productName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      ${product.productPrice?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="border-t px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <p className="text-muted-foreground text-sm">
              {selected.length} product{selected.length !== 1 ? "s" : ""}{" "}
              selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleConfirm}>
                Apply Selection
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
