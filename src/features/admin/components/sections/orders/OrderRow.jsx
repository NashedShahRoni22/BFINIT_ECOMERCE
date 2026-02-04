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
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPrice } from "@/utils/formatPrice";
import useGetStorePreference from "@/features/admin/hooks/store/useGetStorePreference";
import useSelectedStore from "@/hooks/useSelectedStore";

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
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return { date: formattedDate, time: formattedTime };
}

function getPaymentMethodIcon(method) {
  if (method === "COD") return Banknote;
  return CreditCard;
}

function getPaymentMethodLabel(method) {
  const methodMap = {
    COD: "Cash On Delivery",
    STRIPE: "Stripe",
    CARD: "Card",
    BANK_TRANSFER: "Bank Transfer",
  };
  return methodMap[method] || method;
}

export default function OrderRow({ order }) {
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

  const { selectedStore } = useSelectedStore();

  const { data: storePreference } = useGetStorePreference();

  const currencySymbol = storePreference?.currencySymbol;

  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [orderStatus, setOrderStatus] = useState(initialOrderStatus);
  const [deliveryStatus, setDeliveryStatus] = useState(initialDeliveryStatus);

  // Format date and time from createdAt
  const { date: createdDate, time: createdTime } = formatDateTime(createdAt);

  // Calculate total items
  const totalItems =
    products?.reduce((sum, product) => sum + product.quantity, 0) || 0;

  // Get grand total
  const grandTotal = pricingSummary?.grandTotal?.$numberDecimal || "0";

  // Payment info
  const PaymentIcon = getPaymentMethodIcon(payment?.method);
  const paymentMethodLabel = getPaymentMethodLabel(payment?.method);
  const paymentStatus = PAYMENT_STATUS_MAP[payment?.status] || {
    label: payment?.status,
    variant: "secondary",
  };

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
        queryClient.invalidateQueries(["orders", selectedStore?.storeId]);
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
        queryClient.invalidateQueries(["orders", selectedStore?.storeId]);
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
    <TableRow>
      {/* <TableCell className="w-10 border border-l-0">
        <Checkbox />
      </TableCell> */}

      <TableCell className="max-w-xs truncate border text-xs font-medium">
        <div className="flex items-center gap-2">
          <span>{orderId}</span>
          <Button
            onClick={copyOrderId}
            size="icon"
            variant="ghost"
            className="size-4 shrink-0"
          >
            <Copy />
          </Button>
        </div>
      </TableCell>

      <TableCell className="max-w-xs border text-xs">
        <div className="flex flex-col gap-1">
          <span className="text-foreground font-medium">
            {shippingDetails?.name || "N/A"}
          </span>
          <span className="text-muted-foreground">
            {shippingDetails?.email}
          </span>
          <span className="text-muted-foreground">
            {shippingDetails?.countryPhoneCode}
            {shippingDetails?.phone}
          </span>
        </div>
      </TableCell>

      <TableCell className="border text-xs">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">{createdDate}</span>
          <span className="text-muted-foreground">{createdTime}</span>
        </div>
      </TableCell>

      <TableCell className="border text-xs font-medium">
        {totalItems} {totalItems === 1 ? "item" : "items"}
      </TableCell>

      <TableCell className="border text-xs font-medium">
        {formatPrice(grandTotal, currencySymbol)}
      </TableCell>

      <TableCell className="border text-xs">
        <div className="flex items-center gap-1.5">
          <PaymentIcon className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
          <span className="font-medium">{paymentMethodLabel}</span>
        </div>
      </TableCell>

      <TableCell className="border text-xs">
        <Badge variant={paymentStatus.variant} className="text-xs font-normal">
          {paymentStatus.label}
        </Badge>
      </TableCell>

      <TableCell className="border text-xs">
        <Select
          value={orderStatus}
          onValueChange={updateOrderStatus}
          disabled={orderLoading}
        >
          <SelectTrigger className="w-33 border text-xs">
            <SelectValue>
              <Badge
                variant={getStatusVariant(orderStatus, ORDER_STATUSES)}
                className="text-xs font-normal"
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
                <Badge variant={status.variant} className="text-xs font-normal">
                  {status.label}
                </Badge>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell className="border text-xs">
        <Select
          value={deliveryStatus}
          onValueChange={updateDeliveryStatus}
          disabled={deliveryLoading}
        >
          <SelectTrigger className="w-40 border text-xs">
            <SelectValue>
              <Badge
                variant={getStatusVariant(deliveryStatus, DELIVERY_STATUSES)}
                className="text-xs font-normal"
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
                <Badge variant={status.variant} className="text-xs font-normal">
                  {status.label}
                </Badge>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell className="border text-xs">
        <Button variant="ghost" size="sm" asChild className="text-xs">
          <Link to={`/orders/${_id}`}>
            <Eye />
            View
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
