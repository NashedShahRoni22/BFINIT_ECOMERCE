import { useParams } from "react-router";
import useGetHelpContent from "../../../hooks/support/useGetHelpContent";
import EmptyContent from "../../../components/site/EmptyContent";

export default function HelpCenter() {
  const { storeId } = useParams();
  const { data } = useGetHelpContent(storeId);

  return (
    <section className="px-5 py-10 md:container md:mx-auto md:py-16">
      {data?.data ? (
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html: data?.data }}
        ></div>
      ) : (
        <EmptyContent
          title="No Help Content Available"
          description="We couldn't find any help content for this store. The help center
          might not be set up yet or there might be a temporary issue."
        />
      )}
    </section>
  );
}
