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

export default function Brands() {
  const { selectedStore } = useSelectedStore();
  const { data: brands } = useGetBrands();

  const [dialogOpen, setDialogOpen] = useState(false);

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
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={breadcrubms.Brands} />

      {/* Page Header */}
      <PageHeader
        icon={Tag}
        title="Add Brand"
        description="Create and manage brands for"
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        <BrandToolbar onOpen={() => setDialogOpen(true)} />

        {/* brands grid */}
        {brands && brands?.data?.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {brands?.data?.map((brand) => (
              <BrandItem key={brand?.id} brand={brand} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FolderOpen}
            title="No brands found"
            description="Organize your products by creating brands"
            actionLabel="Add Brands"
            onAction={() => setDialogOpen(true)}
          />
        )}
      </div>

      {/* Brand Add modal */}
      <AddBrandDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </section>
  );
}
