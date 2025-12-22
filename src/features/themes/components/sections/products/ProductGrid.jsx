import ProductCard from "../../cards/products/ProductCard";
import { cn } from "@/lib/utils";
import useGetQuery from "@/hooks/api/useGetQuery";
import useAuth from "@/hooks/auth/useAuth";
import { dummyProducts } from "@/features/themes/utils/contstants";
import useSelectedStore from "@/hooks/useSelectedStore";

const gridColsMap = {
  2: "grid-cols-2",
  4: "grid-cols-4",
  6: "grid-cols-6",
};

export default function ProductGrid({ content }) {
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();

  const isManualProduct = content?.productSource?.type === "manual";
  const manualProductIds = isManualProduct ? content?.productSource?.value : [];
  const hasManualProducts = manualProductIds && manualProductIds.length > 0;
  const idsQuery = hasManualProducts ? manualProductIds.join(",") : "";

  const { data: manualProducts } = useGetQuery({
    endpoint: `/product/store/batches?ids=${idsQuery}&limit=${
      content?.productsToShow || 8
    }`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["manual-products", idsQuery],
    enabled: !!user?.data?.clientid && !!user?.token && hasManualProducts,
  });

  // FIX 3: Fetch all products for non-manual selection
  const { data: allProducts, isLoading } = useGetQuery({
    endpoint: `/product/store?storeId=${selectedStore?.storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["all-products"],
    enabled: !!user?.data?.clientid && !!user?.token && !isManualProduct,
  });

  // FIX 4: Properly select which products to display
  const mainProducts = isManualProduct
    ? manualProducts?.data || []
    : allProducts?.data || [];

  const displayProducts =
    mainProducts.length > 0 ? mainProducts : dummyProducts;

  return (
    <div className="bg-muted px-8 py-16">
      {content?.showTitle && (
        <h2 className="mb-10 text-center text-4xl font-bold text-foreground">
          {content.title}
        </h2>
      )}
      <div
        className={cn(
          "grid gap-6 max-w-7xl mx-auto",
          gridColsMap[content?.columns]
        )}
      >
        {displayProducts
          ?.slice(0, parseInt(content?.productsToShow))
          ?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
      </div>
    </div>
  );
}
