import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { FileText, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import EmptyStoreState from "../components/EmptyStoreState";
import TablePagination from "@/components/shared/TablePagination";
import BlogTableRowSkeleton from "../components/skeletons/BlogTableRowSkeleton";
import BankTableRow from "../components/sections/manageBankAccount/BankTableRow";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";
import useDebounce from "@/hooks/useDebounce";
import EmptyState from "@/components/shared/EmptyState";
import { breadcrubms } from "../utils/constants/breadcrumbs";
import { BankTableSkeleton } from "../components/skeletons/BankTableRowSkeleton";

export default function ManageBank() {
  const { activeStore } = useSelectedStore();
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/bankPayment/get-all/${activeStore?.id}`,
    enabled: true,
    isTokenRequired: true,
    queryKey: ["bankAccounts", activeStore?.id, page],
  });

  const bankAccounts = data?.data ?? [];
  const filteredAccounts =
    bankAccounts?.filter((account) => {
      const searchTerm = debouncedSearch?.trim();
      if (!searchTerm) return true;
      return account.bank_name.toLowerCase().includes(searchTerm.toLowerCase());
    }) ?? [];

  if (!activeStore) {
    return (
      <EmptyStoreState
        title="No Store Selected"
        description="Create a store to manage your bank accounts."
      />
    );
  }

  let content = null;

  if (isLoading) {
    content = <BankTableSkeleton />;
  }

  if (!isLoading && filteredAccounts.length > 0) {
    content = (
      <>
        <Table>
          <TableHeader className="bg-card hover:bg-transparent">
            <TableRow>
              <TableHead className="border text-center text-xs font-semibold">
                Bank Account
              </TableHead>
              <TableHead className="border text-center text-xs font-semibold">
                Account Name
              </TableHead>
              <TableHead className="border text-center text-xs font-semibold">
                Account Number
              </TableHead>
              <TableHead className="border text-center text-xs font-semibold">
                Routing Number
              </TableHead>
              <TableHead className="border text-center text-xs font-semibold">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredAccounts?.map((bank) => (
              <BankTableRow key={bank.id} bank={bank} />
            ))}
          </TableBody>
        </Table>
      </>
    );
  }

  if (!isLoading && filteredAccounts?.length === 0) {
    content = (
      <EmptyState
        className="min-h-[calc(100dvh-300px)]"
        icon={FileText}
        title={
          debouncedSearch ? "No matching account found" : "No account added yet"
        }
        description={
          debouncedSearch
            ? `No results for "${debouncedSearch}". Try a different keyword.`
            : "Organize your products by adding bank account"
        }
        actionText={debouncedSearch ? "Clear Search" : "Add Bank"}
        onAction={
          debouncedSearch
            ? () => setSearch("")
            : () => navigate("/payments/bank")
        }
      />
    );
  }

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={breadcrubms.bankPayment} />

      {/* Page Header */}
      <PageHeader
        icon={FileText}
        title="Manage Bank Account"
        description="View and manage all All Bank for"
      />

      <div className="bg-card space-y-6 rounded-lg py-5">
        <div className="flex items-center justify-end gap-4 px-5">
          <div className="relative w-full max-w-72">
            <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Bank..."
              value={search}
              className="pl-7 placeholder:text-xs md:text-xs"
            />
          </div>

          <Button size="sm" asChild className="text-xs">
            <Link to="/payments/bank">
              <Plus /> Add Bank
            </Link>
          </Button>
        </div>

        {content}
      </div>
    </section>
  );
}
