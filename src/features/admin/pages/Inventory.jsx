import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Package, PackageOpen, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks/api/useGetQuery";
import useDebounce from "@/hooks/useDebounce";
import InventoryToolsSkeleton from "../components/skeletons/InventoryToolsSkeleton";
import InventoryTableSkeleton from "../components/skeletons/InventoryTableSkeleton";
import EmptySearchResults from "../components/sections/inventory/EmptySearchResults";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import InventoryTable from "../components/sections/inventory/table/InventoryTable";
import InventoryPagination from "../components/sections/inventory/InventoryPagination";
import EmptyStoreState from "../components/EmptyStoreState";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import EmptyState from "../components/EmptyState";

export default function Inventory() {
  const { selectedStore } = useSelectedStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(search);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) {
      searchParams.set("search", debouncedSearch);
      params.set("page", "1");
    }

    if (!debouncedSearch && currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    setSearchParams(params, { replace: true });
  }, [debouncedSearch, currentPage, searchParams, setSearchParams]);

  const { data, isLoading } = useGetQuery({
    endpoint: `/product/store?storeId=${selectedStore?.storeId}${
      debouncedSearch ? `&search=${debouncedSearch}` : ""
    }&page=${currentPage}`,
    enabled: !!selectedStore?.storeId,
    queryKey: [
      "products",
      "list",
      selectedStore?.storeId,
      debouncedSearch,
      currentPage,
    ],
  });

  const products = data?.data || [];

  const handleClearSearch = () => {
    setSearch("");
    searchParams.delete("search");
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="No Store Selected"
        description="Create a store to start tracking and managing your product inventory."
      />
    );
  }

  let content = null;

  // Initial load - show full skeleton
  if (isLoading && !debouncedSearch) {
    content = (
      <>
        <InventoryToolsSkeleton />
        <InventoryTableSkeleton />
      </>
    );
  }

  // Has products or searching
  if (!isLoading || debouncedSearch) {
    content = (
      <>
        {/* Tools section - always visible when not initial load */}
        <div className="flex items-center justify-end gap-4 px-5">
          <div className="relative w-full max-w-72">
            <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              value={search}
              className="pl-7 placeholder:text-xs md:text-xs"
            />
          </div>
          {/* TODO: implement filter after getting a dedicated inventory get api with advance filtering */}
          {/* <Button
            variant="outline"
            size="sm"
            className="text-muted-foreground text-xs"
          >
            <Settings2 className="size-3.5" /> Filters
          </Button> */}
          <Button size="sm" asChild className="text-xs">
            <Link to="/products/add-product">
              <Plus /> Add Product
            </Link>
          </Button>
        </div>

        {/* Conditional rendering based on state */}
        {isLoading && debouncedSearch ? (
          <InventoryTableSkeleton />
        ) : products.length > 0 ? (
          <>
            <InventoryTable products={products} />
            <InventoryPagination data={data} />
          </>
        ) : debouncedSearch ? (
          // Show search empty state if actively searching
          <EmptySearchResults
            searchQuery={debouncedSearch}
            onClearSearch={handleClearSearch}
          />
        ) : (
          // Show inventory empty state if no products at all
          <EmptyState
            icon={PackageOpen}
            title="No products found"
            description="Get started by adding your first product to the inventory"
            actionLabel="Add Product"
            actionPath="/products/add-product"
          />
        )}
      </>
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.Inventory} />

      <PageHeader
        icon={Package}
        title="Inventory Management"
        description="Track and manage stock levels for"
      />

      {/* products container */}
      <div className="bg-card space-y-6 rounded-lg py-5">{content}</div>
    </section>
  );
}
