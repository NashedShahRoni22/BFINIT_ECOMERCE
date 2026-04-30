import { Landmark, Plus } from "lucide-react";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import useGetQuery from "@/hooks/api/useGetQuery";
import BankAccountsTable from "../components/sections/packageBankAcc/BankAccountsTable";

export default function PackageBankAccounts() {
  const { data } = useGetQuery({
    endpoint: "/api/v1/platform-bank-payment/get-all",
    newBaseUrl: true,
    queryKey: ["platform_banks"],
  });

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.packagesBankAcc} />

      <div className="flex items-center justify-between">
        <PageHeader
          icon={Landmark}
          title="Bank Accounts"
          description="Manage bank accounts shown on the e-Bfinit website"
          showStoreName={false}
        />
        <Button size="sm" asChild className="shrink-0 text-xs">
          <Link to="/bank-accounts/add">
            <Plus /> Add Bank Account
          </Link>
        </Button>
      </div>

      <BankAccountsTable data={data?.data} />
    </section>
  );
}
