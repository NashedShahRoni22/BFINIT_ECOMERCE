import { Landmark, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import useGetQuery from "@/hooks/api/useGetQuery";
import BankAccountsTable from "../components/sections/bank-accounts/BankAccountsTable";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import { breadcrubms } from "../utils/constants/breadcrumbs";
import PageHeader from "@/components/shared/PageHeader";
import BankAccountsTableSkeleton from "@/components/skeletons/BankAccountsTableSkeleton";

export default function PackageBankAccounts() {
  const { data, isLoading } = useGetQuery({
    endpoint: "/api/v1/platform-bank-payment/get-all-admin",
    newBaseUrl: true,
    queryKey: ["platform_banks"],
  });

  let content = null;

  if (isLoading) {
    content = <BankAccountsTableSkeleton />;
  }

  if (data?.success) {
    content = <BankAccountsTable data={data?.data} />;
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.bank_accounts} />

      <div className="flex items-center justify-between">
        <PageHeader
          icon={Landmark}
          title="Bank Accounts"
          description="Manage bank accounts shown on the e-Bfinit"
        />
        <Button size="sm" asChild className="shrink-0 text-xs">
          <Link to="/super-admin/bank-accounts/new">
            <Plus /> Add Bank Account
          </Link>
        </Button>
      </div>

      {content}
    </section>
  );
}
