import { useState } from "react";
import { FolderOpen, FolderPlus } from "lucide-react";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetCategories from "../hooks/category/useGetCategories";
import EmptyStoreState from "../components/EmptyStoreState";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import CategoryToolbar from "../components/sections/category/CategoryToolbar";
import CategoryItem from "../components/sections/category/CategoryItem";
import EmptyState from "../components/EmptyState";
import AddCategoryDialog from "../components/modals/AddCategoryDialog";

export default function Category() {
  const { selectedStore } = useSelectedStore();

  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: categories } = useGetCategories();

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="No Store Selected"
        description="Create a store before organizing your products into categories."
      />
    );
  }

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={breadcrubms.Category} />

      {/* Page Header */}
      <PageHeader
        icon={FolderPlus}
        title="Add Category"
        description="Create and manage categories for"
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        <CategoryToolbar onOpen={() => setDialogOpen(true)} />

        {categories && categories?.data?.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {categories?.data?.map((category) => (
              <CategoryItem key={category?.id} category={category} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FolderOpen}
            title="No categories found"
            description="Organize your products by creating categories"
            actionLabel="Add Category"
            onAction={() => setDialogOpen(true)}
          />
        )}
      </div>

      {/* Category modal */}
      <AddCategoryDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </section>
  );
}
