import { useParams } from "react-router";
import ProductCard from "../../cards/products/ProductCard";
import useGetQuery from "@/hooks/api/useGetQuery";
import { cn } from "@/lib/utils";
import { dummyProducts } from "@/features/themes/utils/contstants";
import useTheme from "@/hooks/useTheme";

const gridColsMap = {
  2: "grid-cols-2",
  4: "grid-cols-4",
  6: "grid-cols-6",
};

export default function ProductGrid({ content }) {
  const { storeId } = useParams();
  const { isEditorMode } = useTheme();

  const isManualProduct = content?.productSource?.type === "manual";
  const manualProductIds = isManualProduct ? content?.productSource?.value : [];
  const hasManualProducts = manualProductIds && manualProductIds.length > 0;
  const idsQuery = hasManualProducts ? manualProductIds.join(",") : "";

  // TODO: need to fix product object structure as same as allProducts
  const { data: manualProducts } = useGetQuery({
    endpoint: `/product/store/batches?ids=${idsQuery}&limit=${
      content?.productsToShow || 8
    }`,
    queryKey: ["manual-products", idsQuery],
    enabled: !!idsQuery && !!content?.productsToShow && hasManualProducts,
  });

  const { data: allProducts } = useGetQuery({
    endpoint: `/product/store?storeId=${storeId}`,
    queryKey: ["products", "list", storeId],
    enabled: !!storeId && !isManualProduct,
  });

  const mainProducts = isManualProduct
    ? manualProducts?.data || []
    : allProducts?.data || [];

  const displayProducts =
    mainProducts.length > 0 ? mainProducts : dummyProducts;

  if (!isEditorMode && mainProducts?.length === 0) {
    return null;
  }

  return (
    <div className="bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {content?.showTitle && (
          <h2 className="mb-10 text-center text-4xl font-bold">
            {content.title}
          </h2>
        )}
        <div
          className={cn(
            "mx-auto grid max-w-7xl gap-6",
            gridColsMap[content?.columns],
          )}
        >
          {displayProducts
            ?.slice(0, parseInt(content?.productsToShow))
            ?.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
