import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  Copy,
  Printer,
  X,
  CheckCircle2,
  Package,
  Truck,
  Calendar,
  DollarSign,
  Edit,
  CreditCard,
  Building2,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data
const generateOrders = () => {
  const statuses = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];
  const paymentStatuses = ["pending", "paid", "failed"];
  const paymentMethods = ["stripe", "bank_transfer", "cash_on_delivery"];
  const customers = [
    { name: "John Doe", email: "john@example.com", phone: "+880123456789" },
    { name: "Sarah Smith", email: "sarah@example.com", phone: "+880198765432" },
    { name: "Ahmed Khan", email: "ahmed@example.com", phone: "+880171234567" },
    {
      name: "Maria Garcia",
      email: "maria@example.com",
      phone: "+880187654321",
    },
    { name: "David Lee", email: "david@example.com", phone: "+880191112222" },
  ];
  const products = [
    { name: "Venture", price: 1699.99 },
    { name: "Rog Ally X RC72LA", price: 4654 },
    { name: "Varinat Enable Testing", price: 4500 },
  ];

  return Array.from({ length: 50 }, (_, i) => {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const itemCount = Math.floor(Math.random() * 3) + 1;
    const orderItems = Array.from({ length: itemCount }, () => {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      return { ...product, quantity };
    });
    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const paymentMethod =
      paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

    const date = new Date(
      2026,
      0,
      Math.floor(Math.random() * 14) + 1,
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60),
    );

    return {
      id: `VEN-${String(50 - i).padStart(6, "0")}`,
      customer,
      items: orderItems,
      totalAmount: total,
      paymentStatus:
        paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
      orderStatus: statuses[Math.floor(Math.random() * statuses.length)],
      paymentMethod,
      paymentDetails:
        paymentMethod === "bank_transfer"
          ? {
              bankName: "Dutch Bangla Bank",
              accountNumber: "****1234",
              transactionId:
                "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase(),
            }
          : paymentMethod === "stripe"
            ? {
                last4: "4242",
                brand: "Visa",
                stripePaymentId:
                  "pi_" + Math.random().toString(36).substr(2, 9),
              }
            : null,
      shippingAddress: {
        street: "123 Main Street",
        city: "Dhaka",
        area: ["Gulshan", "Banani", "Dhanmondi", "Mirpur"][
          Math.floor(Math.random() * 4)
        ],
        postalCode: "1212",
      },
      trackingNumber:
        Math.random() > 0.5
          ? "TRK" + Math.random().toString(36).substr(2, 10).toUpperCase()
          : null,
      createdAt: date.toISOString(),
      statusHistory: [
        {
          status: "pending",
          timestamp: date.toISOString(),
          note: "Order placed",
        },
      ],
    };
  });
};

const OrdersManagement = () => {
  const [orders, setOrders] = useState(generateOrders());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusUpdateModal, setStatusUpdateModal] = useState(null);
  const [paymentUpdateModal, setPaymentUpdateModal] = useState(null);

  const itemsPerPage = 10;

  const orderStatusConfig = {
    pending: {
      label: "Pending",
      color: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      icon: Clock,
    },
    confirmed: {
      label: "Confirmed",
      color: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      icon: CheckCircle2,
    },
    processing: {
      label: "Processing",
      color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      icon: Package,
    },
    shipped: {
      label: "Shipped",
      color: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      icon: Truck,
    },
    delivered: {
      label: "Delivered",
      color: "bg-green-100 text-green-800 hover:bg-green-100",
      icon: CheckCircle2,
    },
    cancelled: {
      label: "Cancelled",
      color: "bg-red-100 text-red-800 hover:bg-red-100",
      icon: X,
    },
  };

  const paymentStatusConfig = {
    pending: {
      label: "Pending",
      color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    },
    paid: {
      label: "Paid",
      color: "bg-green-100 text-green-700 hover:bg-green-100",
    },
    failed: {
      label: "Failed",
      color: "bg-red-100 text-red-700 hover:bg-red-100",
    },
  };

  const paymentMethodConfig = {
    stripe: { label: "Stripe", icon: CreditCard, color: "text-purple-600" },
    bank_transfer: {
      label: "Bank Transfer",
      icon: Building2,
      color: "text-blue-600",
    },
    cash_on_delivery: {
      label: "Cash on Delivery",
      icon: DollarSign,
      color: "text-green-600",
    },
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        order.customer.phone.includes(searchQuery);

      const matchesStatus =
        statusFilter === "all" || order.orderStatus === statusFilter;
      const matchesPayment =
        paymentFilter === "all" || order.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, searchQuery, statusFilter, paymentFilter]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleExport = () => {
    const csv = [
      [
        "Order ID",
        "Customer",
        "Email",
        "Phone",
        "Items",
        "Total",
        "Payment Status",
        "Order Status",
        "Date",
      ].join(","),
      ...filteredOrders.map((order) =>
        [
          order.id,
          order.customer.name,
          order.customer.email,
          order.customer.phone,
          order.items.length,
          order.totalAmount,
          order.paymentStatus,
          order.orderStatus,
          order.createdAt,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const handleStatusUpdate = (orderId, newStatus, note, trackingNumber) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const newHistory = [
            ...order.statusHistory,
            {
              status: newStatus,
              timestamp: new Date().toISOString(),
              note,
            },
          ];
          return {
            ...order,
            orderStatus: newStatus,
            statusHistory: newHistory,
            trackingNumber: trackingNumber || order.trackingNumber,
          };
        }
        return order;
      }),
    );
    setStatusUpdateModal(null);
    if (selectedOrder?.id === orderId) {
      const updated = orders.find((o) => o.id === orderId);
      setSelectedOrder({ ...updated, orderStatus: newStatus });
    }
  };

  const handlePaymentUpdate = (orderId, newPaymentStatus, note) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            paymentStatus: newPaymentStatus,
          };
        }
        return order;
      }),
    );
    setPaymentUpdateModal(null);
    if (selectedOrder?.id === orderId) {
      const updated = orders.find((o) => o.id === orderId);
      setSelectedOrder({ ...updated, paymentStatus: newPaymentStatus });
    }
  };

  const StatusUpdateModal = () => {
    const [newStatus, setNewStatus] = useState(
      statusUpdateModal?.orderStatus || "",
    );
    const [note, setNote] = useState("");
    const [trackingNumber, setTrackingNumber] = useState(
      statusUpdateModal?.trackingNumber || "",
    );

    return (
      <Dialog
        open={!!statusUpdateModal}
        onOpenChange={() => setStatusUpdateModal(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Update the delivery status for order {statusUpdateModal?.id}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Order Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(orderStatusConfig).map(([key, config]) => {
                    const Icon = config.icon;
                    return (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {config.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {(newStatus === "shipped" || newStatus === "delivered") && (
              <div className="space-y-2">
                <Label>Tracking Number (Optional)</Label>
                <Input
                  placeholder="Enter tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Note (Optional)</Label>
              <Textarea
                placeholder="Add a note about this status change..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setStatusUpdateModal(null)}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleStatusUpdate(
                  statusUpdateModal.id,
                  newStatus,
                  note,
                  trackingNumber,
                )
              }
              disabled={!newStatus}
            >
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const PaymentUpdateModal = () => {
    const [newPaymentStatus, setNewPaymentStatus] = useState(
      paymentUpdateModal?.paymentStatus || "",
    );
    const [note, setNote] = useState("");

    return (
      <Dialog
        open={!!paymentUpdateModal}
        onOpenChange={() => setPaymentUpdateModal(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Payment Status</DialogTitle>
            <DialogDescription>
              Update the payment status for order {paymentUpdateModal?.id}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Payment Status</Label>
              <Select
                value={newPaymentStatus}
                onValueChange={setNewPaymentStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Note (Optional)</Label>
              <Textarea
                placeholder="Add a note about this payment update..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPaymentUpdateModal(null)}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                handlePaymentUpdate(
                  paymentUpdateModal.id,
                  newPaymentStatus,
                  note,
                )
              }
              disabled={!newPaymentStatus}
            >
              Update Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <span>Home</span>
            <span>/</span>
            <span className="text-gray-900">Orders</span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">Orders</h1>
              <p className="text-gray-600">
                View and manage customer orders for Venture
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Orders</span>
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">Delivered</span>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {orders.filter((o) => o.orderStatus === "delivered").length}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">In Transit</span>
              <Truck className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {
                orders.filter((o) =>
                  ["processing", "shipped"].includes(o.orderStatus),
                ).length
              }
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Revenue</span>
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              ৳
              {formatCurrency(
                orders
                  .filter((o) => o.paymentStatus === "paid")
                  .reduce((sum, o) => sum + o.totalAmount, 0),
              )}
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search by Order ID, Customer Name, Email, or Phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleExport} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          {(searchQuery ||
            statusFilter !== "all" ||
            paymentFilter !== "all") && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <span>Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSearchQuery("")}
                  />
                </Badge>
              )}
              {statusFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Status: {orderStatusConfig[statusFilter].label}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setStatusFilter("all")}
                  />
                </Badge>
              )}
              {paymentFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Payment: {paymentStatusConfig[paymentFilter].label}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setPaymentFilter("all")}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">
                    Order ID
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">
                    Date & Time
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">
                    Items
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">
                    Total
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">
                    Payment
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="p-4 text-right text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-500">
                      <Package className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                      <p className="text-lg font-medium">No orders found</p>
                      <p className="text-sm">
                        Try adjusting your filters or search query
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order) => {
                    const PaymentIcon =
                      paymentMethodConfig[order.paymentMethod].icon;
                    return (
                      <tr
                        key={order.id}
                        className="border-b transition-colors hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-blue-600">
                              {order.id}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => copyToClipboard(order.id)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {order.customer.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.customer.email}
                            </p>
                            <p className="text-xs text-gray-400">
                              {order.customer.phone}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {formatDate(order.createdAt)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatTime(order.createdAt)}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-auto p-0 hover:bg-transparent"
                              >
                                <span className="text-blue-600 hover:underline">
                                  {order.items.length}{" "}
                                  {order.items.length === 1 ? "item" : "items"}
                                </span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                              <div className="space-y-2">
                                <h4 className="text-sm font-semibold">
                                  Order Items
                                </h4>
                                {order.items.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between border-b pb-2 text-sm last:border-b-0"
                                  >
                                    <span className="text-gray-700">
                                      {item.name}{" "}
                                      <span className="text-gray-500">
                                        x{item.quantity}
                                      </span>
                                    </span>
                                    <span className="font-medium">
                                      ৳
                                      {formatCurrency(
                                        item.price * item.quantity,
                                      )}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-semibold text-gray-900">
                              ৳{formatCurrency(order.totalAmount)}
                            </p>
                            <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                              <PaymentIcon
                                className={`h-3 w-3 ${paymentMethodConfig[order.paymentMethod].color}`}
                              />
                              <span>
                                {paymentMethodConfig[order.paymentMethod].label}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              paymentStatusConfig[order.paymentStatus].color
                            }
                          >
                            {paymentStatusConfig[order.paymentStatus].label}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              orderStatusConfig[order.orderStatus].color
                            }
                          >
                            {orderStatusConfig[order.orderStatus].label}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setStatusUpdateModal(order)}
                              >
                                <Truck className="mr-2 h-4 w-4" />
                                Update Status
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setPaymentUpdateModal(order)}
                              >
                                <CreditCard className="mr-2 h-4 w-4" />
                                Update Payment
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Printer className="mr-2 h-4 w-4" />
                                Print Invoice
                              </DropdownMenuItem>
                              {order.orderStatus !== "cancelled" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <X className="mr-2 h-4 w-4" />
                                    Cancel Order
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-9"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Order Details Dialog */}
        <Dialog
          open={!!selectedOrder}
          onOpenChange={() => setSelectedOrder(null)}
        >
          <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Order Details - {selectedOrder?.id}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setStatusUpdateModal(selectedOrder);
                      setSelectedOrder(null);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Update Status
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPaymentUpdateModal(selectedOrder);
                      setSelectedOrder(null);
                    }}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Update Payment
                  </Button>
                </div>
              </DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                {/* Status Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="mb-2 text-sm text-gray-600">Order Status</p>
                    <Badge
                      className={`${orderStatusConfig[selectedOrder.orderStatus].color} text-base`}
                    >
                      {orderStatusConfig[selectedOrder.orderStatus].label}
                    </Badge>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="mb-2 text-sm text-gray-600">Payment Status</p>
                    <Badge
                      className={`${paymentStatusConfig[selectedOrder.paymentStatus].color} text-base`}
                    >
                      {paymentStatusConfig[selectedOrder.paymentStatus].label}
                    </Badge>
                  </div>
                </div>

                {/* Customer & Order Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 font-semibold">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                        <span className="text-sm font-bold text-blue-600">
                          {selectedOrder.customer.name.charAt(0)}
                        </span>
                      </div>
                      Customer Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-gray-600">Name:</span>{" "}
                        <span className="font-medium">
                          {selectedOrder.customer.name}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-600">Email:</span>{" "}
                        <span className="font-medium">
                          {selectedOrder.customer.email}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-600">Phone:</span>{" "}
                        <span className="font-medium">
                          {selectedOrder.customer.phone}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 font-semibold">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      Order Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-gray-600">Order Date:</span>{" "}
                        <span className="font-medium">
                          {formatDate(selectedOrder.createdAt)}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-600">Order Time:</span>{" "}
                        <span className="font-medium">
                          {formatTime(selectedOrder.createdAt)}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-gray-600">Payment Method:</span>
                        {React.createElement(
                          paymentMethodConfig[selectedOrder.paymentMethod].icon,
                          {
                            className: `w-4 h-4 ${paymentMethodConfig[selectedOrder.paymentMethod].color}`,
                          },
                        )}
                        <span className="font-medium">
                          {
                            paymentMethodConfig[selectedOrder.paymentMethod]
                              .label
                          }
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                {selectedOrder.paymentDetails && (
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <h3 className="mb-2 font-semibold text-blue-900">
                      Payment Details
                    </h3>
                    {selectedOrder.paymentMethod === "bank_transfer" ? (
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-blue-700">Bank:</span>{" "}
                          <span className="font-medium text-blue-900">
                            {selectedOrder.paymentDetails.bankName}
                          </span>
                        </p>
                        <p>
                          <span className="text-blue-700">Account:</span>{" "}
                          <span className="font-medium text-blue-900">
                            {selectedOrder.paymentDetails.accountNumber}
                          </span>
                        </p>
                        <p>
                          <span className="text-blue-700">Transaction ID:</span>{" "}
                          <span className="font-medium text-blue-900">
                            {selectedOrder.paymentDetails.transactionId}
                          </span>
                        </p>
                      </div>
                    ) : selectedOrder.paymentMethod === "stripe" ? (
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-blue-700">Card:</span>{" "}
                          <span className="font-medium text-blue-900">
                            {selectedOrder.paymentDetails.brand} ••••{" "}
                            {selectedOrder.paymentDetails.last4}
                          </span>
                        </p>
                        <p>
                          <span className="text-blue-700">Payment ID:</span>{" "}
                          <span className="font-medium text-blue-900">
                            {selectedOrder.paymentDetails.stripePaymentId}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-blue-700">
                        Payment will be collected upon delivery
                      </p>
                    )}
                  </div>
                )}

                {/* Shipping Address */}
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-semibold">
                    <MapPin className="h-5 w-5 text-gray-600" />
                    Shipping Address
                  </h3>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm">
                      {selectedOrder.shippingAddress.street}
                      <br />
                      {selectedOrder.shippingAddress.area},{" "}
                      {selectedOrder.shippingAddress.city}
                      <br />
                      {selectedOrder.shippingAddress.postalCode}
                    </p>
                  </div>
                </div>

                {/* Tracking Number */}
                {selectedOrder.trackingNumber && (
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="mb-1 text-sm text-purple-700">
                          Tracking Number
                        </p>
                        <p className="font-semibold text-purple-900">
                          {selectedOrder.trackingNumber}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(selectedOrder.trackingNumber)
                        }
                        className="border-purple-300 text-purple-700 hover:bg-purple-100"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Order Items */}
                <div>
                  <h3 className="mb-3 font-semibold">Order Items</h3>
                  <div className="overflow-hidden rounded-lg border">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-3 text-left text-sm font-semibold">
                            Product
                          </th>
                          <th className="p-3 text-center text-sm font-semibold">
                            Qty
                          </th>
                          <th className="p-3 text-right text-sm font-semibold">
                            Price
                          </th>
                          <th className="p-3 text-right text-sm font-semibold">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items.map((item, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="p-3 text-sm">{item.name}</td>
                            <td className="p-3 text-center text-sm">
                              {item.quantity}
                            </td>
                            <td className="p-3 text-right text-sm">
                              ৳{formatCurrency(item.price)}
                            </td>
                            <td className="p-3 text-right text-sm font-medium">
                              ৳{formatCurrency(item.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                        <tr className="border-t bg-gray-50">
                          <td
                            colSpan={3}
                            className="p-3 text-right text-sm font-semibold"
                          >
                            Total Amount:
                          </td>
                          <td className="p-3 text-right text-sm font-bold">
                            ৳{formatCurrency(selectedOrder.totalAmount)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Status History */}
                {selectedOrder.statusHistory &&
                  selectedOrder.statusHistory.length > 0 && (
                    <div>
                      <h3 className="mb-3 font-semibold">Order Timeline</h3>
                      <div className="space-y-3">
                        {selectedOrder.statusHistory.map((history, idx) => (
                          <div key={idx} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                {React.createElement(
                                  orderStatusConfig[history.status]?.icon ||
                                    Clock,
                                  {
                                    className: "w-4 h-4 text-blue-600",
                                  },
                                )}
                              </div>
                              {idx < selectedOrder.statusHistory.length - 1 && (
                                <div className="my-1 h-full w-0.5 bg-gray-200" />
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="mb-1 flex items-center gap-2">
                                <Badge
                                  className={
                                    orderStatusConfig[history.status]?.color ||
                                    "bg-gray-100"
                                  }
                                >
                                  {orderStatusConfig[history.status]?.label ||
                                    history.status}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {formatDate(history.timestamp)} at{" "}
                                  {formatTime(history.timestamp)}
                                </span>
                              </div>
                              {history.note && (
                                <p className="mt-1 text-sm text-gray-600">
                                  {history.note}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 border-t pt-4">
                  <Button variant="outline" className="gap-2">
                    <Printer className="h-4 w-4" />
                    Print Invoice
                  </Button>
                  {selectedOrder.orderStatus !== "cancelled" &&
                    selectedOrder.orderStatus !== "delivered" && (
                      <Button variant="destructive" className="gap-2">
                        <X className="h-4 w-4" />
                        Cancel Order
                      </Button>
                    )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Status Update Modal */}
        <StatusUpdateModal />

        {/* Payment Update Modal */}
        <PaymentUpdateModal />
      </div>
    </div>
  );
};

export default OrdersManagement;
