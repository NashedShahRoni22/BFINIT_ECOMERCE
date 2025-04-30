import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router";

export default function OrderRow({ order }) {
  const {
    orderId,
    OrderStatus,
    TotalAmount,
    PaymentStatus,
    deliveryStatus,
    PaymentMethode,
  } = order;

  return (
    <tr className="border-t border-neutral-200">
      <td className="py-2 text-sm">#{orderId}</td>
      <td className="py-2 text-center text-sm">{OrderStatus}</td>
      <td className="py-2 text-center text-sm">
        ${TotalAmount.$numberDecimal}
      </td>
      <td className="py-2 text-center text-sm">{PaymentStatus}</td>
      <td className="py-2 text-center text-sm">{deliveryStatus}</td>
      <td className="py-2 text-center text-sm">{PaymentMethode}</td>
      <td className="py-2 text-center text-sm">
        <div className="inline-flex items-center justify-center space-x-2">
          <Link to={`/orders/${orderId}`}>
            <FaRegEdit className="text-dashboard-primary/75 hover:text-dashboard-primary min-w-fit cursor-pointer text-lg transition-all duration-200 ease-in-out" />
          </Link>

          {/* <button>
            <FaRegTrashAlt className="min-w-fit cursor-pointer text-lg text-red-300 transition-all duration-200 ease-in-out hover:text-red-500" />
          </button> */}
        </div>
      </td>
    </tr>
  );
}
