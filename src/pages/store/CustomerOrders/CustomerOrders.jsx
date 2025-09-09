import { ArrowDown, Funnel } from "lucide-react";

const orders = [
  {
    orderId: "ORD-9012",
    date: "6/2/2023",
    items: 4,
    total: 199.95,
    status: "In Transit",
  },
  {
    orderId: "ORD-1234",
    date: "5/15/2023",
    items: 3,
    total: 129.99,
    status: "Delivered",
  },
  {
    orderId: "ORD-5678",
    date: "4/28/2023",
    items: 2,
    total: 85.5,
    status: "Delivered",
  },
];

export default function CustomerOrders() {
  return (
    <div>
      <div className="rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold">My Orders</h2>
        <p>Manage and track your orders</p>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-900">3</span> orders
          </p>

          <div className="flex items-center gap-2">
            <div>
              <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Funnel size={16} className="text-gray-500" />
                Filter
              </button>
            </div>

            <div>
              <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <ArrowDown size={16} className="text-gray-500" />
                Sort
              </button>
            </div>
          </div>
        </div>

        {/* desktop - orders table */}
        <div className="mt-6 hidden w-full md:block">
          <table
            className="w-full text-sm text-gray-700"
            role="table"
            aria-label="Orders list"
          >
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Items</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-sm font-semibold">
                    {order.orderId}
                  </td>
                  <td className="px-4 py-3 text-sm">{order.date}</td>
                  <td className="px-4 py-3 text-sm">{order.items} items</td>
                  <td className="px-4 py-3 text-sm font-semibold">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="text-accent cursor-pointer text-sm font-medium"
                      aria-label={`View details for order ${order.orderId}`}
                    >
                      Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* mobile - orders card */}
        <div className="mt-6 w-full space-y-3 md:hidden">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              {/* Header with Order ID and Status */}
              <div className="mb-4 flex items-start justify-between">
                <div className="font-mono text-base font-semibold text-gray-900">
                  {order.orderId}
                </div>
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Details */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium text-gray-900">
                    {order.date}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Items</span>
                  <span className="font-medium text-gray-900">
                    {order.items} items
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Total</span>
                  <span className="font-semibold text-gray-900">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 border-t border-gray-100 pt-3">
                <button
                  className="text-accent text-sm font-medium"
                  aria-label={`View details for order ${order.orderId}`}
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
