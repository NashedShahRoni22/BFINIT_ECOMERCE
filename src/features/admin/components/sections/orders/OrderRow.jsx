import { useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { Eye, Package } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuth from "@/hooks/auth/useAuth";
import usePatchMutaion from "@/hooks/api/usePatchMutaion";

// Status configurations matching API format
const ORDER_STATUSES = [
  { value: "PLACED", label: "Placed", variant: "secondary" },
  { value: "CONFIRMED", label: "Confirmed", variant: "default" },
  { value: "PROCESSING", label: "Processing", variant: "default" },
  { value: "SHIPPED", label: "Shipped", variant: "default" },
  { value: "DELIVERED", label: "Delivered", variant: "default" },
  { value: "CANCELLED", label: "Cancelled", variant: "destructive" },
];

const DELIVERY_STATUSES = [
  { value: "PENDING", label: "Pending", variant: "secondary" },
  { value: "IN_TRANSIT", label: "In Transit", variant: "default" },
  { value: "OUT_FOR_DELIVERY", label: "Out for Delivery", variant: "default" },
  { value: "DELIVERED", label: "Delivered", variant: "default" },
  { value: "FAILED", label: "Failed", variant: "destructive" },
  { value: "RETURNED", label: "Returned", variant: "destructive" },
];

function getStatusVariant(status, statusList) {
  const found = statusList.find((s) => s.value === status);
  return found ? found.variant : "secondary";
}

function getStatusLabel(status, statusList) {
  const found = statusList.find((s) => s.value === status);
  return found ? found.label : status;
}

export default function OrderRow({ order, storeId }) {
  const {
    orderId,
    OrderStatus: initialOrderStatus,
    deliveryStatus: initialDeliveryStatus,
    createdDate,
    createdTime,
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
  const updateOrderStatus = (value) => {
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

  // function to update delivery status
  const updateDeliveryStatus = (value) => {
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
    <tr className="hover:bg-muted/30 transition-colors">
      {/* Order ID */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Package className="text-muted-foreground h-4 w-4 flex-shrink-0" />
          <span className="text-foreground font-mono text-xs">#{orderId}</span>
        </div>
      </td>

      {/* Date & Time */}
      <td className="px-4 py-3">
        <div className="text-xs">
          <div className="text-foreground font-medium">{createdDate}</div>
          <div className="text-muted-foreground">{createdTime}</div>
        </div>
      </td>

      {/* Order Status */}
      <td className="px-4 py-3">
        <div className="flex justify-center">
          <Select
            value={orderStatus}
            onValueChange={updateOrderStatus}
            disabled={orderLoading}
          >
            <SelectTrigger className="border-border h-8 w-32 text-xs">
              <SelectValue>
                <Badge
                  variant={getStatusVariant(orderStatus, ORDER_STATUSES)}
                  className="text-xs"
                >
                  {getStatusLabel(orderStatus, ORDER_STATUSES)}
                </Badge>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {ORDER_STATUSES.map((status) => (
                <SelectItem
                  key={status.value}
                  value={status.value}
                  className="text-xs"
                >
                  <Badge variant={status.variant} className="text-xs">
                    {status.label}
                  </Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </td>

      {/* Delivery Status */}
      <td className="px-4 py-3">
        <div className="flex justify-center">
          <Select
            value={deliveryStatus}
            onValueChange={updateDeliveryStatus}
            disabled={deliveryLoading}
          >
            <SelectTrigger className="border-border h-8 w-36 text-xs">
              <SelectValue>
                <Badge
                  variant={getStatusVariant(deliveryStatus, DELIVERY_STATUSES)}
                  className="text-xs"
                >
                  {getStatusLabel(deliveryStatus, DELIVERY_STATUSES)}
                </Badge>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {DELIVERY_STATUSES.map((status) => (
                <SelectItem
                  key={status.value}
                  value={status.value}
                  className="text-xs"
                >
                  <Badge variant={status.variant} className="text-xs">
                    {status.label}
                  </Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" asChild className="h-8 text-xs">
            <Link to={`/orders/${orderId}`}>
              <Eye className="mr-1.5 h-3.5 w-3.5" />
              View
            </Link>
          </Button>
        </div>
      </td>
    </tr>
  );
}
