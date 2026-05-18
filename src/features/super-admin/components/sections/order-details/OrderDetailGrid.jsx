import ApprovalCard from "../../cards/ApprovalCard";
import CustomerCard from "../../cards/CustomerCard";
import InvoiceSummaryCard from "../../cards/InvoiceSummaryCard";
import OrderDetailsPackageCard from "../../cards/OrderDetailsPackageCard";
import BankTransferDetails from "./BankTransferDetails";
import StripePaymentDetails from "./StripePaymentDetails";

export default function OrderDetailGrid({ orderDetails }) {
  const isBankPayment = orderDetails?.payment_method === "bank_transfer";

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8 flex flex-col gap-4">
        <CustomerCard orderDetails={orderDetails} />
        <InvoiceSummaryCard orderDetails={orderDetails} />
        <OrderDetailsPackageCard orderDetails={orderDetails} />
      </div>

      <div className="col-span-4 flex flex-col gap-4">
        {isBankPayment ? (
          <BankTransferDetails orderDetails={orderDetails} />
        ) : (
          <StripePaymentDetails orderDetails={orderDetails} />
        )}
        <ApprovalCard orderDetails={orderDetails} />
      </div>
    </div>
  );
}
