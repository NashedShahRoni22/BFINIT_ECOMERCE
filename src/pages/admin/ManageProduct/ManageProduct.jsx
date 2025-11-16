import { Link } from "react-router";
import ProductRow from "../../../components/admin/ProductRow/ProductRow";
import useGetProductsByStoreId from "../../../hooks/products/useGetProductsByStoreId";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";
import ManageProductCard from "../../../components/admin/Cards/ManageProductCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronDownIcon, Package, SlashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PageHeader from "@/components/admin/shared/PageHeader";
import useSelectedStore from "@/hooks/stores/useSelectedStore";

export default function ManageProduct() {
  const { selectedStore } = useSelectedStore();

  // fetch all products by selected storeId
  const { data: products } = useGetProductsByStoreId(selectedStore?.storeId);
  // fetch store preference
  const { data: storePreference } = useGetStorePreference(
    selectedStore?.storeId,
  );

  return (
    <section className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
                Products
                <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/products/category">Category</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/products/sub-category">Sub Category</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/products/brands">Brands</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/products/add-product">Add Product</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Inventory</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader
        icon={Package}
        title="Inventory Management"
        description="Track and manage stock levels for"
      />

      {products && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          {/* Desktop Table View */}
          {products?.data?.length > 0 && (
            <div className="hidden w-full md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Brand
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products?.data?.map((product) => (
                    <ProductRow
                      key={product.productId}
                      product={product}
                      storeId={selectedStore?.storeId}
                      currencySymbol={storePreference?.currencySymbol}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile Card View */}
          <div className="md:hidden">
            <div className="divide-y divide-gray-200">
              {products?.data?.map((product) => (
                <ManageProductCard
                  key={product.productId}
                  product={product}
                  storeId={selectedStore?.storeId}
                  currencySymbol={storePreference?.currencySymbol}
                />
              ))}
            </div>
          </div>

          {products &&
            products?.message === "No products found for this store." && (
              <div className="px-4 text-center text-sm text-gray-500">
                No products found for this store. Start by adding a new one.
              </div>
            )}
        </div>
      )}
    </section>
  );
}
