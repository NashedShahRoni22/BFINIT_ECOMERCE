import { useParams } from "react-router";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import EmptyContent from "../../../components/site/EmptyContent";

export default function TermsPreview() {
  const { storeId } = useParams();
  const { data } = useGetQuery({
    endpoint: `/store/storeterms/${storeId}`,
    queryKey: ["/store/storeterms", storeId],
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
          title="Terms & Conditions Not Available"
          description="This store has not published its terms and conditions yet. Please check back later or contact the store for more information."
        />
      )}
    </section>
  );
}
