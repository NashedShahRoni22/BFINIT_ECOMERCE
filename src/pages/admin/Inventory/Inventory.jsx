import { Link } from "react-router";
import { Package, Plus, Search, Settings2 } from "lucide-react";
import { DynamicBreadcrumb } from "@/components/admin/DynamicBreadcrumb";
import PageHeader from "@/components/admin/shared/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InventoryTable from "@/components/admin/Inventory/InventoryTable/InventoryTable";
import InventoryTableSkeleton from "@/components/admin/loaders/InventoryTableSkeleton";
import InventoryEmptyState from "@/components/admin/Inventory/InventoryTable/InventoryEmptyState";
import useGetQuery from "@/hooks/queries/useGetQuery";
import useSelectedStore from "@/hooks/stores/useSelectedStore";

const INVENTORY_BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    dropdown: [
      { label: "Category", href: "/products/category" },
      { label: "Sub Category", href: "/products/sub-category" },
      { label: "Brands", href: "/products/brands" },
      { label: "Add Product", href: "/products/add-product" },
    ],
  },
  { label: "Inventory" },
];

export default function Inventory() {
  const { selectedStore } = useSelectedStore();

  // Fetch inventory products
  const { data, isLoading } = useGetQuery({
    endpoint: `/product/store?storeId=${selectedStore?.storeId}`,
    token: true,
    clientId: true,
    enabled: !!selectedStore?.storeId,
    queryKey: [`/product/store`, selectedStore?.storeId],
  });

  const products = data?.data || [];

  let content = null;

  if (isLoading) {
    content = <InventoryTableSkeleton />;
  }

  if (!isLoading && products.length > 0) {
    content = (
      <>
        {/* Tools section */}
        <div className="flex items-center justify-end gap-4 px-5">
          {/* search field */}
          <div className="relative w-full max-w-72">
            <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <Input className="pl-8" placeholder="Search products..." />
          </div>
          <Button variant="outline" size="sm" className="text-muted-foreground">
            <Settings2 /> Filters
          </Button>
          <Button size="sm" asChild>
            <Link to="/products/add-product">
              <Plus /> Add Product
            </Link>
          </Button>
        </div>

        {/* Products Table */}
        <InventoryTable products={products} />
      </>
    );
  }

  if (!isLoading && products.length === 0) {
    content = <InventoryEmptyState />;
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={INVENTORY_BREADCRUMB_ITEMS} />

      <PageHeader
        icon={Package}
        title="Inventory Management"
        description="Track and manage stock levels for"
      />

      {/* products container */}
      <div className="bg-card space-y-6 rounded-lg pt-5">{content}</div>
    </section>
  );
}
