import { useParams } from "react-router";
import Hero from "@/components/storefront/sections/content/Hero";
import useGetQuery from "@/hooks/api/useGetQuery";
import { ContentPageSkeleton } from "@/components/storefront/loader/ContentPageSkeleton";
import { EmptyContent } from "@/components/storefront/sections/content/EmptyContent";

export default function ContentPage({ title, apiEndpoint }) {
  const { storeId } = useParams();

  const endpointUrl =
    apiEndpoint && storeId ? `${apiEndpoint}/${storeId}` : null;

  const { data, isLoading } = useGetQuery({
    endpoint: endpointUrl,
    queryKey: [endpointUrl],
    enabled: !!endpointUrl,
  });

  if (isLoading) {
    return <ContentPageSkeleton title={title} />;
  }

  if (!data?.data) {
    return <EmptyContent title={title} />;
  }

  return (
    <div>
      <Hero title={title} />

      <div
        id="content-display"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <article dangerouslySetInnerHTML={{ __html: data.data }} />
      </div>
    </div>
  );
}
