import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Package, PackageOpen, Plus, Search, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import useGetStorePreference from "../hooks/store/useGetStorePreference";

export default function Inventory() {
  const { selectedStore } = useSelectedStore();
  const { data: storePreference } = useGetStorePreference();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(search);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const countries = useMemo(
    () => storePreference?.countries || [],
    [storePreference?.countries],
  );

  // Get default country or first country
  const defaultCountry = useMemo(() => {
    const defaultC = countries.find((c) => c.isDefault);
    return defaultC || countries[0];
  }, [countries]);

  // Get selected country name from URL or use default
  const [selectedCountryName, setSelectedCountryName] = useState(
    searchParams.get("country") || defaultCountry?.country_name || "",
  );

  // Update URL when country changes
  useEffect(() => {
    if (
      selectedCountryName &&
      selectedCountryName !== searchParams.get("country")
    ) {
      const params = new URLSearchParams(searchParams);
      params.set("country", selectedCountryName);
      params.set("page", "1"); // Reset to page 1 when changing country
      setSearchParams(params, { replace: true });
    }
  }, [selectedCountryName, searchParams, setSearchParams]);

  // Update search params
  useEffect(() => {
    const params = new URLSearchParams();

    // Always include country
    if (selectedCountryName) {
      params.set("country", selectedCountryName);
    }

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
      params.set("page", "1");
    } else if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    setSearchParams(params, { replace: true });
  }, [debouncedSearch, currentPage, selectedCountryName, setSearchParams]);

  // Get selected country details
  const selectedCountry = useMemo(() => {
    return countries.find((c) => c.country_name === selectedCountryName);
  }, [countries, selectedCountryName]);

  // Build API endpoint with country name filter
  const { data, isLoading } = useGetQuery({
    endpoint: `/product/store?storeId=${selectedStore?.storeId}${
      selectedCountryName
        ? `&countryName=${encodeURIComponent(selectedCountryName)}`
        : ""
    }${debouncedSearch ? `&search=${debouncedSearch}` : ""}&page=${currentPage}`,
    enabled: !!selectedStore?.storeId && !!selectedCountryName,
    queryKey: [
      "products",
      "list",
      selectedStore?.storeId,
      selectedCountryName,
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

  const handleCountryChange = (countryName) => {
    setSelectedCountryName(countryName);
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
        <div className="flex flex-col gap-4 px-5 md:flex-row md:items-center md:justify-between">
          {/* Left side - Country selector */}
          <div className="flex items-center gap-2">
            <Globe className="text-muted-foreground h-4 w-4 shrink-0" />
            <Select
              value={selectedCountryName}
              onValueChange={handleCountryChange}
            >
              <SelectTrigger className="w-[200px] text-xs">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem
                    key={country._id}
                    value={country.country_name}
                    className="text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span>{country.country_name}</span>
                      {country.isDefault && (
                        <span className="text-muted-foreground text-[10px]">
                          (Default)
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCountry && (
              <span className="text-muted-foreground text-xs">
                {selectedCountry.currency_code} (
                {selectedCountry.currency_symbol})
              </span>
            )}
          </div>

          {/* Right side - Search and Add button */}
          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-72">
              <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
              <Input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                value={search}
                className="pl-7 placeholder:text-xs md:text-xs"
              />
            </div>

            <Button size="sm" asChild className="shrink-0 text-xs">
              <Link to="/products/add-product">
                <Plus /> Add Product
              </Link>
            </Button>
          </div>
        </div>

        {/* Conditional rendering based on state */}
        {isLoading && debouncedSearch ? (
          <InventoryTableSkeleton />
        ) : products.length > 0 ? (
          <>
            <InventoryTable
              products={products}
              selectedCountry={selectedCountry}
            />
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
            description={`No products found for ${selectedCountry?.country_name}. Add your first product to get started.`}
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
