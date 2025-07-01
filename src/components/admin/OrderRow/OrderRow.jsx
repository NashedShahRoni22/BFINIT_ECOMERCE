import { useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { SlEye } from "react-icons/sl";
import useAuth from "../../../hooks/auth/useAuth";
import usePatchMutaion from "../../../hooks/mutations/usePatchMutaion";
import { useQueryClient } from "@tanstack/react-query";

export default function OrderRow({ order, currencySymbol, storeId }) {
  const {
    orderId,
    OrderStatus: initialOrderStatus,
    TotalAmount,
    PaymentStatus,
    deliveryStatus: initialDeliveryStatus,
    PaymentMethode,
  } = order;
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [orderStatus, setOrderStatus] = useState(initialOrderStatus);
  const [deliveryStatus, setDeliveryStatus] = useState(initialDeliveryStatus);

  // custom patch hooks to update order status
  const { mutate: orderMutate, isPending: orderLoading } = usePatchMutaion({
    endpoint: `/orders/update/order/${orderId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  // custom patch hooks to update delivery status
  const { mutate: deliveryMutate, isPending: deliveryLoading } =
    usePatchMutaion({
      endpoint: `/orders/update/delivery/${orderId}`,
      token: user?.token,
      clientId: user?.data?.clientid,
    });

  // function to update order status
  const updateOrderStatus = (e) => {
    const value = e.target.value;
    setOrderStatus(value);

    const payload = {
      orderStatus: value,
    };

    orderMutate(payload, {
      onSuccess: () => {
        toast.success("Order status updated!");
        queryClient.invalidateQueries(["orders", storeId]);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    });
  };

  // function to update delevery status
  const updateDeliveryStatus = (e) => {
    const value = e.target.value;
    setDeliveryStatus(value);

    const payload = {
      deliveryStatus: value,
    };

    deliveryMutate(payload, {
      onSuccess: () => {
        toast.success("Delivery status updated!");
        queryClient.invalidateQueries(["orders", storeId]);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    });
  };

  return (
    <tr className="border-t border-neutral-200">
      <td className="py-2 text-sm">#{orderId}</td>
      <td className="py-2 text-center text-sm">
        {currencySymbol}
        {TotalAmount.$numberDecimal}
      </td>
      <td className="py-2 text-center text-sm">{PaymentMethode}</td>
      <td className="py-2 text-center text-sm">{PaymentStatus}</td>
      <td className="py-2 text-center text-sm">
        <select
          value={orderStatus}
          disabled={orderLoading}
          onChange={updateOrderStatus}
          className={`cursor-pointer rounded-md border px-1 py-0.5 text-xs font-medium outline-none ${orderStatus === "Pending" ? "bg-yellow-100 text-yellow-500" : "bg-green-100 text-green-600"}`}
        >
          <option value="Pending" className="text-black">
            Pending
          </option>
          <option value="Confirm" className="text-black">
            Confirm
          </option>
        </select>
      </td>
      <td className="py-2 text-center text-sm">
        <select
          value={deliveryStatus}
          disabled={deliveryLoading}
          onChange={updateDeliveryStatus}
          className={`cursor-pointer rounded-md border px-1 py-0.5 text-xs font-medium outline-none ${deliveryStatus === "Pending" ? "bg-yellow-100 text-yellow-500" : "bg-green-100 text-green-600"}`}
        >
          <option value="Pending" className="text-black">
            Pending
          </option>
          <option value="Shipped" className="text-black">
            Shipped
          </option>
        </select>
      </td>
      <td className="py-2 text-center text-sm">
        <div className="inline-flex items-center justify-center">
          <Link to={`/orders/${orderId}`}>
            <SlEye className="text-dashboard-primary/75 hover:text-dashboard-primary min-w-fit cursor-pointer text-lg transition-all duration-200 ease-in-out" />
          </Link>
        </div>
      </td>
    </tr>
  );
}
