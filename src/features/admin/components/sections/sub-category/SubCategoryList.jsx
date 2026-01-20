import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReusableModal from "../../modals/ReusableModal";
import UpdateSubCategoryModal from "../../modals/UpdateSubCategoryModal";
import DeleteSubCategoryModal from "../../modals/DeleteSubCategoryModal";

export default function SubCategoryList({ subCategory, categoryId, storeId }) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(subCategory);

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    // Changed py-4 to py-3 for a tighter UI
    // Removed the Fragment (<>...</>) wrapper so Modals don't stack as blocks
    <div className="group flex items-center justify-between border-b border-border/50 px-6 py-3 transition-all hover:bg-muted/40 last:border-b-0">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-dashboard-primary/40 group-hover:bg-dashboard-primary transition-colors" />
        <p className="text-sm font-medium text-foreground">{subCategory}</p>
      </div>

      <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-dashboard-primary/10 hover:text-dashboard-primary"
          onClick={() => setIsUpdateModalOpen(true)}
          title="Edit Subcategory"
        >
          <Edit className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
          onClick={() => setIsDeleteModalOpen(true)}
          title="Delete Subcategory"
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        {/* FIX: Modals are placed INSIDE this flex container.
           This prevents them from creating vertical whitespace 
           in the main list layout.
        */}
        <ReusableModal isOpen={isUpdateModalOpen} close={closeUpdateModal}>
          <UpdateSubCategoryModal
            subCategory={subCategory}
            updatedName={updatedName}
            setUpdatedName={setUpdatedName}
            close={closeUpdateModal}
            categoryId={categoryId}
            storeId={storeId}
          />
        </ReusableModal>

        <ReusableModal isOpen={isDeleteModalOpen} close={closeDeleteModal}>
          <DeleteSubCategoryModal
            subCategory={subCategory}
            close={closeDeleteModal}
            categoryId={categoryId}
            storeId={storeId}
          />
        </ReusableModal>
      </div>
    </div>
  );
}