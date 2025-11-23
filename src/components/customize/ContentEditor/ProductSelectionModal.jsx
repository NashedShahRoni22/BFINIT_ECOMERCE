import { useState, useEffect } from "react";
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
import { Search, Package } from "lucide-react";

export default function ProductSelectionModal({
  isOpen,
  onClose,
  selectedProductIds = [],
  onConfirm,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(selectedProductIds);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("Selected Product ID's", selectedProductIds);

  useEffect(() => {
    if (isOpen) {
      setSelected(selectedProductIds);
      fetchProducts();
    }
  }, [isOpen]);

  const fetchProducts = async () => {
    setLoading(true);
    // TODO: Replace with actual API call
    // Example: const response = await fetch('/api/products');
    setTimeout(() => {
      setProducts([
        {
          id: "1",
          name: "Product 1",
          price: 29.99,
          image: "https://via.placeholder.com/80",
        },
        {
          id: "2",
          name: "Product 2",
          price: 39.99,
          image: "https://via.placeholder.com/80",
        },
        {
          id: "3",
          name: "Product 3",
          price: 49.99,
          image: "https://via.placeholder.com/80",
        },
        {
          id: "4",
          name: "Product 4",
          price: 59.99,
          image: "https://via.placeholder.com/80",
        },
        {
          id: "5",
          name: "Product 5",
          price: 69.99,
          image: "https://via.placeholder.com/80",
        },
        {
          id: "6",
          name: "Product 6",
          price: 79.99,
          image: "https://via.placeholder.com/80",
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const toggleProduct = (productId) => {
    setSelected((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleConfirm = () => {
    onConfirm(selected);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] max-w-2xl p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-base">Select Products</DialogTitle>
        </DialogHeader>

        {/* Search Bar */}
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

        {/* Product List */}
        <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-3">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground flex flex-col items-center gap-2">
                <Package size={32} className="animate-pulse" />
                <p className="text-sm">Loading products...</p>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground text-center">
                <Package size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">No products found</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => toggleProduct(product.id)}
                  className={`hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${selected.includes(product.id) ? "border-primary bg-primary/5" : ""} `}
                >
                  <Checkbox
                    checked={selected.includes(product.id)}
                    onCheckedChange={() => toggleProduct(product.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-medium">
                      {product.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
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
