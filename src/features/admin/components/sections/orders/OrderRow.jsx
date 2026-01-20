import { useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { Eye, Copy, CreditCard, Banknote } from "lucide-react";
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

const PAYMENT_STATUS_MAP = {
  PENDING: { label: "Pending", variant: "secondary" },
  COMPLETED: { label: "Completed", variant: "default" },
  FAILED: { label: "Failed", variant: "destructive" },
};

function getStatusVariant(status, statusList) {
  const found = statusList.find((s) => s.value === status);
  return found ? found.variant : "secondary";
}

function getStatusLabel(status, statusList) {
  const found = statusList.find((s) => s.value === status);
  return found ? found.label : status;
}

function formatDateTime(isoString) {
  const date = new Date(isoString);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  return { date: formattedDate, time: formattedTime };
}

function getPaymentMethodIcon(method) {
  if (method === 'COD') return Banknote;
  return CreditCard;
}

function getPaymentMethodLabel(method) {
  const methodMap = {
    'COD': 'Cash On Delivery',
    'STRIPE': 'Stripe',
    'CARD': 'Card',
    'BANK_TRANSFER': 'Bank Transfer',
  };
  return methodMap[method] || method;
}

export default function OrderRow({ order, storeId, currencySymbol = '৳' }) {
  const {
    _id,
    orderId,
    orderStatus: initialOrderStatus,
    deliveryStatus: initialDeliveryStatus,
    createdAt,
    pricingSummary,
    products,
    payment,
    shippingDetails,
  } = order;

  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [orderStatus, setOrderStatus] = useState(initialOrderStatus);
  const [deliveryStatus, setDeliveryStatus] = useState(initialDeliveryStatus);

  // Format date and time from createdAt
  const { date: createdDate, time: createdTime } = formatDateTime(createdAt);

  // Calculate total items
  const totalItems = products?.reduce((sum, product) => sum + product.quantity, 0) || 0;

  // Get grand total
  const grandTotal = pricingSummary?.grandTotal?.$numberDecimal || "0";

  // Payment info
  const PaymentIcon = getPaymentMethodIcon(payment?.method);
  const paymentMethodLabel = getPaymentMethodLabel(payment?.method);
  const paymentStatus = PAYMENT_STATUS_MAP[payment?.status] || { label: payment?.status, variant: "secondary" };

  // custom patch hooks to update order status
  const { mutate: orderMutate, isPending: orderLoading } = usePatchMutaion({
    endpoint: `/orders/update/order/${_id}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  // custom patch hooks to update delivery status
  const { mutate: deliveryMutate, isPending: deliveryLoading } =
    usePatchMutaion({
      endpoint: `/orders/update/delivery/${_id}`,
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
        setOrderStatus(initialOrderStatus);
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
        setDeliveryStatus(initialDeliveryStatus);
      },
    });
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId || _id);
    toast.success("Order ID copied!");
  };

  return (
    <tr className="hover:bg-muted/30 transition-colors border-b border-border">
      {/* Order ID */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="text-primary font-medium text-sm">
            {orderId || `#${_id.slice(-8)}`}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={copyOrderId}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </td>

      {/* Customer */}
      <td className="px-4 py-4">
        <div className="flex flex-col">
          <span className="text-foreground font-medium text-sm">
            {shippingDetails?.name || 'N/A'}
          </span>
          <span className="text-muted-foreground text-xs">
            {shippingDetails?.email}
          </span>
          <span className="text-muted-foreground text-xs">
            {shippingDetails?.countryPhoneCode}{shippingDetails?.phone}
          </span>
        </div>
      </td>

      {/* Date & Time */}
      <td className="px-4 py-4">
        <div className="text-sm">
          <div className="text-foreground font-medium">{createdDate}</div>
          <div className="text-muted-foreground text-xs">{createdTime}</div>
        </div>
      </td>

      {/* Items */}
      <td className="px-4 py-4">
        <span className="text-primary font-medium text-sm">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
      </td>

      {/* Total */}
      <td className="px-4 py-4">
        <span className="text-foreground font-semibold text-sm">
          {currencySymbol}{Number(grandTotal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </td>

      {/* Payment */}
      <td className="px-4 py-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <PaymentIcon className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-foreground text-xs font-medium">
              {paymentMethodLabel}
            </span>
          </div>
          <Badge variant={paymentStatus.variant} className="text-xs w-fit">
            {paymentStatus.label}
          </Badge>
        </div>
      </td>

      {/* Order Status */}
      <td className="px-4 py-4">
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
      <td className="px-4 py-4">
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
      <td className="px-4 py-4">
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" asChild className="h-8 text-xs">
            <Link to={`/orders/${orderId || _id}`}>
              <Eye className="mr-1.5 h-3.5 w-3.5" />
              View
            </Link>
          </Button>
        </div>
      </td>
    </tr>
  );
}