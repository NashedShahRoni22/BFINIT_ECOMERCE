import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import useGetStores from "../../../hooks/stores/useGetStores";

export default function Payments() {
  // fetch all stores
  const { data: stores } = useGetStores();
  console.log(stores);

  return (
    <section>
      <PageHeading heading="Manage Payment" />
    </section>
  );
}
