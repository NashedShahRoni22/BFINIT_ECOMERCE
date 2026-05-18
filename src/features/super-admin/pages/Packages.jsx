import { Crown, Plus } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PackageStats from "../components/sections/PackageStats";
import PackageList from "../components/list/PackageList";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { breadcrubms } from "../utils/constants/breadcrumbs";
import PageHeader from "@/components/shared/PageHeader";
import PackagesSkeleton from "@/components/skeletons/PackagesSkeleton";

export default function Packages() {
  const { data, isLoading } = useGetQuery({
    endpoint: "/api/v1/package/get-all-admin",
    enabled: true,
    queryKey: ["packages"],
  });

  let content = null;

  if (isLoading) {
    content = <PackagesSkeleton />;
  }

  if (data?.success) {
    content = (
      <>
        <PackageStats data={data?.data} />
        <PackageList data={data?.data} />
      </>
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.packages} />

      <div className="flex items-center justify-between">
        <PageHeader
          icon={Crown}
          title="Packages"
          description="Manage subscription packages shown on the e-Bfinit"
        />
        <Button size="sm" asChild className="shrink-0 text-xs">
          <Link to="/super-admin/packages/add-package">
            <Plus /> Add Package
          </Link>
        </Button>
      </div>

      {content}
    </section>
  );
}
