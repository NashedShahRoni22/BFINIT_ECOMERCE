import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import OrderRow from "../../../components/admin/OrderRow/OrderRow";

export default function Orders() {
  return (
    <section>
      <PageHeading heading="Manage Orders" />

      <table className="mt-6 w-full">
        <thead>
          <tr className="border-y border-neutral-200 text-left">
            <th className="py-2 text-sm font-medium">Order ID</th>
            <th className="py-2 text-sm font-medium">Product</th>
            <th className="py-2 text-sm font-medium">Quantity</th>
            <th className="py-2 text-sm font-medium">Price</th>
            <th className="py-2 text-sm font-medium">Status</th>
            <th className="py-2 text-sm font-medium">Customer</th>
            <th className="py-2 text-sm font-medium">Address</th>
            <th className="py-2 text-sm font-medium">Payments</th>
            <th className="py-2 text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 2 }, (_, i) => (
            <OrderRow key={i} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
