import { useContext } from "react";
import { CustomerContext } from "../../Providers/CustomerProvider";

export default function useCustomer() {
  const customerInfo = useContext(CustomerContext);
  return customerInfo;
}
