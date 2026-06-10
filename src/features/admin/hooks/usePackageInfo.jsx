import useAuth from "@/hooks/auth/useAuth";
import useGetQuery from "@/hooks-v2/api/useGetQuery";

export default function usePackageInfo() {
  const { lastPackageStatus, token } = useAuth();

  return useGetQuery({
    endpoint: `/api/v1/package-order/order-info/${lastPackageStatus.invoice_number}`,
    enabled: !!token && !!lastPackageStatus.invoice_number,
    isTokenRequired: true,
    queryKey: ["package", lastPackageStatus.invoice_number],
  });
}
