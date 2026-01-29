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
import useDebounce from "@/hooks/useDebounce";

export default function Category() {
  const { selectedStore } = useSelectedStore();
  const { data: categories } = useGetCategories();

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const debouncedSearch = useDebounce(search);

  const filteredCategories =
    categories?.data?.filter((category) => {
      const searchTerm = debouncedSearch?.trim();
      if (!searchTerm) return true;

      return category.name.toLowerCase().includes(searchTerm.toLowerCase());
    }) ?? [];

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
      <DynamicBreadcrumb items={breadcrubms.Category} />

      <PageHeader
        icon={FolderPlus}
        title="Add Category"
        description="Create and manage categories for"
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        <CategoryToolbar
          search={search}
          setSearch={setSearch}
          onOpen={() => setDialogOpen(true)}
        />

        {filteredCategories?.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {filteredCategories?.map((category) => (
              <CategoryItem key={category?.id} category={category} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FolderOpen}
            title={
              debouncedSearch
                ? "No categories match your search"
                : "No categories found"
            }
            description={
              debouncedSearch
                ? `No results for "${debouncedSearch}"`
                : "Organize your products by creating categories"
            }
            actionLabel="Add Category"
            onAction={() => setDialogOpen(true)}
          />
        )}
      </div>

      <AddCategoryDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </section>
  );
}
