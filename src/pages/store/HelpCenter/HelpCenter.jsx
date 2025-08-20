import { useParams } from "react-router";
import useGetHelpContent from "../../../hooks/support/useGetHelpContent";

export default function HelpCenter() {
  const { storeId } = useParams();
  const { data, isLoading } = useGetHelpContent(storeId);

  return (
    <section className="mx-5 py-10 md:container md:mx-auto md:py-16">
      <div id="preview" dangerouslySetInnerHTML={{ __html: data?.data }}></div>
    </section>
  );
}
