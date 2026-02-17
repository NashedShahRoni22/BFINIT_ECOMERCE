import useGetOrders from "@/features/admin/hooks/orders/useGetOrders";
import { ChartColumn, DollarSign, ShoppingCart, Users } from "lucide-react";
import StatCard from "./StatCard";
import useGetStorePreference from "@/features/admin/hooks/store/useGetStorePreference";
import { formatPrice } from "@/utils/formatPrice";
import StatCardsSkeleton from "../../skeletons/StatCardsSkeleton";
import useGetCustomer from "@/features/admin/hooks/customers/useGetCustomer";
import { formatNumber } from "@/utils/formatNumber";
import { getCurrencySymbol } from "@/utils/currencyHelpers";

export default function StatCards() {
  const { data: storePreference, isLoading: isStorePreferenceLoading } =
    useGetStorePreference();
  const { data: orders, isLoading: isOrdersLoading } = useGetOrders();
  const { data: customers, isLoading: isCustomersLoading } = useGetCustomer();

  const currencySymbol = getCurrencySymbol(storePreference);
  const totalCustomers = customers?.length || 0;
  const totalOrders = orders?.data?.length || 0;

  const totalSales =
    orders?.data?.reduce((accumulator, currOrder) => {
      const amount = parseFloat(
        currOrder?.pricingSummary?.grandTotal?.$numberDecimal || 0,
      );
      return accumulator + amount;
    }, 0) || 0;

  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  if (isStorePreferenceLoading || isOrdersLoading || isCustomersLoading) {
    return <StatCardsSkeleton />;
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 rounded md:grid-cols-2 lg:grid-cols-4">
      {/* total sales */}
      <StatCard
        icon={ChartColumn}
        label="Total Sales"
        value={formatPrice(totalSales, currencySymbol)}
      />

      {/* total orders */}
      <StatCard
        icon={ShoppingCart}
        label="Total Orders"
        value={formatNumber(totalOrders)}
      />

      {/* total customers */}
      <StatCard
        icon={Users}
        label="Total Customers"
        value={formatNumber(totalCustomers)}
      />

      {/* average orders */}
      <StatCard
        icon={DollarSign}
        label="Average Order Value"
        value={formatPrice(averageOrderValue, currencySymbol)}
      />
    </div>
  );
}
