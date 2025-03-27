import { useState } from "react";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";

const customersData = [
  {
    id: "CUST-1001",
    name: "John Smith",
    email: "john.smith@example.com",
    orders: 12,
    total: "$1,245.00",
    lastPurchase: "2023-05-15",
    status: "Active",
  },
  {
    id: "CUST-1002",
    name: "Emily Johnson",
    email: "emily.j@example.com",
    orders: 5,
    total: "$689.50",
    lastPurchase: "2023-05-10",
    status: "Active",
  },
  {
    id: "CUST-1003",
    name: "Michael Brown",
    email: "michael.b@example.com",
    orders: 2,
    total: "$199.99",
    lastPurchase: "2023-04-28",
    status: "Inactive",
  },
  {
    id: "CUST-1004",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    orders: 8,
    total: "$1,012.75",
    lastPurchase: "2023-05-12",
    status: "Active",
  },
  {
    id: "CUST-1005",
    name: "David Lee",
    email: "david.lee@example.com",
    orders: 1,
    total: "$89.99",
    lastPurchase: "2023-03-15",
    status: "Inactive",
  },
];

export default function Customers() {
  const [selectedStore, setSelectedStore] = useState("");

  // Handle store select change
  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
  };

  return (
    <section>
      {/* Page Heading */}
      <PageHeading heading="Manage Customers" />

      {/* Store Selection */}
      <div className="my-6 flex flex-wrap items-center justify-between">
        {selectedStore ? (
          <h3 className="text-lg font-semibold">
            Manage Customers of Store {selectedStore}
          </h3>
        ) : (
          <h3 className="text-lg font-semibold">
            Select a Store to Manage Customers
          </h3>
        )}

        <div className="relative">
          <label htmlFor="storeSelect" className="sr-only">
            Select Store
          </label>
          <select
            id="storeSelect"
            value={selectedStore}
            onChange={handleStoreChange}
            className="rounded-md border border-neutral-300 p-2 text-sm focus:outline-none"
          >
            <option value="" disabled>
              Select Store
            </option>
            {Array.from({ length: 5 }).map((_, i) => (
              <option key={i} value={i + 1}>
                Store {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* selected table data */}
      {selectedStore && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y border-neutral-200">
                <th className="py-2 text-sm font-medium">Customer ID</th>
                <th className="py-2 text-sm font-medium">Name</th>
                <th className="py-2 text-sm font-medium">Email</th>
                <th className="py-2 text-sm font-medium">Orders</th>
                <th className="py-2 text-sm font-medium">Total Spent</th>
                <th className="py-2 text-sm font-medium">Last Purchase</th>
                <th className="py-2 text-sm font-medium">Status</th>
                <th className="py-2 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customersData.map((customer, i) => (
                <tr key={i} className="border-y border-neutral-200">
                  <td className="py-3 text-center text-sm">{customer.id}</td>
                  <td className="py-3 text-center text-sm">{customer.name}</td>
                  <td className="py-3 text-center text-sm">{customer.email}</td>
                  <td className="py-3 text-center text-sm">
                    {customer.orders}
                  </td>
                  <td className="py-3 text-center text-sm">{customer.total}</td>
                  <td className="py-3 text-center text-sm">
                    {customer.lastPurchase}
                  </td>
                  <td className="py-3 text-center text-sm">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-3 text-center text-sm">
                    <button className="mr-2 text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
