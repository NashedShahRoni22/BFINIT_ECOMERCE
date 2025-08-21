import { useParams } from "react-router";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import EmptyContent from "../../../components/site/EmptyContent";

export default function BuyGuidePreview() {
  const { storeId } = useParams();
  const { data } = useGetQuery({
    endpoint: `/store/howtobuy/${storeId}`,
    queryKey: ["/store/howtobuy", storeId],
    enabled: !!storeId,
  });

  return (
    <section className="px-5 py-10 md:container md:mx-auto md:py-16">
      {data?.data ? (
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html: data?.data }}
        ></div>
      ) : (
        <EmptyContent
          title="How to Buy Guide Not Available"
          description="This store has not provided instructions on how to make a purchase yet. Please check back later or contact the store for assistance."
        />
      )}
    </section>
  );
}
