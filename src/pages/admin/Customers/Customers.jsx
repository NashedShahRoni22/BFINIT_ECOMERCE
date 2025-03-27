import CustomerRow from "../../../components/admin/CustomerRow/CustomerRow";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";

export default function Customers() {
  return (
    <section>
      <PageHeading heading="Manage Customers" />

      <table className="mt-6 w-full">
        <thead>
          <tr className="border-y border-neutral-200 text-left">
            <th className="py-2 text-sm font-medium">User</th>
            <th className="py-2 text-sm font-medium">Contacts</th>
            <th className="py-2 text-sm font-medium">Address</th>
            <th className="py-2 text-sm font-medium">Orders</th>
            <th className="py-2 text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }, (_, i) => (
            <CustomerRow key={i} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
