import { useState } from "react";
import { FolderOpen, Tag } from "lucide-react";
import useGetBrands from "../hooks/brands/useGetBrands";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import useSelectedStore from "@/hooks/useSelectedStore";
import EmptyStoreState from "../components/EmptyStoreState";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import BrandToolbar from "../components/sections/brands/BrandToolbar";
import BrandItem from "../components/sections/brands/BrandItem";
import AddBrandDialog from "../components/modals/AddBrandDialog";
import EmptyState from "../components/EmptyState";
import useDebounce from "@/hooks/useDebounce";

export default function Brands() {
  const { selectedStore } = useSelectedStore();
  const { data: brands } = useGetBrands();

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const debouncedSearch = useDebounce(search);

  const filteredBrands =
    brands?.data?.filter((brand) => {
      const searchTerm = debouncedSearch?.trim();
      if (!searchTerm) return true;

      return brand?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    }) ?? [];

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="No Store Selected"
        description="Create a store before adding and managing product brands."
      />
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.Brands} />

      <PageHeader
        icon={Tag}
        title="Add Brand"
        description="Create and manage brands for"
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        <BrandToolbar
          search={search}
          setSearch={setSearch}
          onOpen={() => setDialogOpen(true)}
        />

        {/* brands grid */}
        {filteredBrands?.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {filteredBrands?.map((brand) => (
              <BrandItem key={brand?.id} brand={brand} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FolderOpen}
            title={
              debouncedSearch
                ? "No brands match your search"
                : "No brands found"
            }
            description={
              debouncedSearch
                ? `No results for "${debouncedSearch}"`
                : "Organize your products by creating brands"
            }
            actionLabel="Add Brands"
            onAction={() => setDialogOpen(true)}
          />
        )}
      </div>

      <AddBrandDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </section>
  );
}
