// src/components/customize/ContentEditor/CollectionSelectionModal.jsx

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";

export default function CollectionSelectionModal({
  isOpen,
  onClose,
  selectedCollectionId,
  onConfirm,
}) {
  const [selected, setSelected] = useState(selectedCollectionId);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setSelected(selectedCollectionId);
      // TODO: Fetch collections from API
      setCollections([
        { id: "1", name: "Summer Collection", productCount: 24 },
        { id: "2", name: "Winter Sale", productCount: 18 },
        { id: "3", name: "New Arrivals", productCount: 32 },
      ]);
    }
  }, [isOpen, selectedCollectionId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Collection</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 py-4">
          {collections.map((collection) => (
            <div
              key={collection.id}
              onClick={() => setSelected(collection.id)}
              className={`hover:bg-muted/50 cursor-pointer rounded-lg border p-3 transition-colors ${selected === collection.id ? "border-primary bg-primary/5" : ""} `}
            >
              <div className="flex items-center gap-3">
                <FolderOpen size={20} className="text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{collection.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {collection.productCount} products
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onConfirm(selected);
              onClose();
            }}
            disabled={!selected}
          >
            Select Collection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
