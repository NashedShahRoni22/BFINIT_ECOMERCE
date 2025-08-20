import { useParams } from "react-router";
import useGetQuery from "../../../hooks/queries/useGetQuery";

export default function BuyGuidePreview() {
  const { storeId } = useParams();
  const { data, isLoading } = useGetQuery({
    endpoint: `/store/howtobuy/${storeId}`,
    queryKey: ["/store/howtobuy", storeId],
    enabled: !!storeId,
  });

  return (
    <section className="mx-5 py-10 md:container md:mx-auto md:py-16">
      <div id="preview" dangerouslySetInnerHTML={{ __html: data?.data }}></div>
    </section>
  );
}
