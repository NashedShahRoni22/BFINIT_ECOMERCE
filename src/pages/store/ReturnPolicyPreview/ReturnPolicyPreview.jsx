import { useParams } from "react-router";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import EmptyContent from "../../../components/site/EmptyContent";

export default function ReturnPolicyPreview() {
  const { storeId } = useParams();
  const { data } = useGetQuery({
    endpoint: `/store/return&refund/${storeId}`,
    queryKey: ["/store/return&refund", storeId],
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
          title="No Return Policy Available"
          description="This store has not published a return and refund policy yet. Please contact the store directly if you have any questions about returns or refunds."
        />
      )}
    </section>
  );
}
