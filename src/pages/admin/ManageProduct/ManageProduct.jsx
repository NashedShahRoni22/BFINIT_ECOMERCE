import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import ProductRow from "../../../components/admin/ProductRow/ProductRow";

export default function ManageProduct() {
  return (
    <section>
      <PageHeading heading="Manage Product" />

      <div className="mt-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-neutral-200">
              <th className="py-2 text-sm font-medium">Name</th>
              <th className="py-2 text-sm font-medium">Category</th>
              <th className="py-2 text-sm font-medium">SKU</th>
              <th className="py-2 text-sm font-medium">Quantity</th>
              <th className="py-2 text-sm font-medium">Price</th>
              <th className="py-2 text-sm font-medium">Status</th>
              <th className="py-2 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }, (_, i) => (
              <ProductRow key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
