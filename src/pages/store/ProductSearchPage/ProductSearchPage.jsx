import { useParams } from "react-router";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import Product1 from "../../../components/site/products/Product1";
import useAuth from "../../../hooks/auth/useAuth";

export default function ProductSearchPage() {
  const { storeId, keyword } = useParams();
  const { user } = useAuth();
  const { data, isLoading: searchLoading } = useGetQuery({
    endpoint: `/product/by-keyword/?storeId=${storeId}&keyword=${keyword}`,
    queryKey: ["products", "by-keyword", storeId, keyword],
    enabled: !!keyword && !!storeId,
  });

  // Check if data exists and is empty
  const hasNoResults =
    data && Array.isArray(data.data) && data.data.length === 0;

  // fetch store preference
  const { data: storePreferenceData, isLoading: storePreferenceLoading } =
    useGetQuery({
      endpoint: `/store/preference/?storeId=${storeId}`,
      token: user?.token,
      queryKey: ["storePreference", storeId],
      enabled: !!storeId && !!user?.token,
    });

  return (
    <main className="font-roboto h-full min-h-[calc(100vh-124px)] px-5 py-10 md:container md:mx-auto">
      <h1 className="font-merriweather mx-auto mb-10 w-full max-w-5xl text-center text-xl font-medium md:text-3xl">
        Search results for: <span className="text-accent">{keyword}</span>
      </h1>

      {searchLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-lg">Loading...</div>
        </div>
      )}

      {hasNoResults && (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto max-w-md">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <svg
                className="h-8 w-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              No products found
            </h3>
            <p className="mb-6 text-gray-600">
              Sorry, we couldn&apos;t find any products matching &quot;{keyword}
              &quot;. Try adjusting your search or browse our categories.
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-accent text-on-primary hover:bg-accent/90 inline-flex items-center rounded-md border border-transparent px-6 py-3 text-sm font-medium transition-colors"
            >
              Continue shopping
            </button>
          </div>
        </div>
      )}

      {data?.data?.length > 0 && <Product1 products={data.data} />}
    </main>
  );
}
