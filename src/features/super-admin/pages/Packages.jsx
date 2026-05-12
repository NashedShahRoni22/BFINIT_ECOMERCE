import { Crown, Plus } from "lucide-react";
import { Link } from "react-router";
import DynamicBreadcrumb from "../../admin/components/DynamicBreadcrumb";
import PageHeader from "../../admin/components/PageHeader";
import PackageStats from "../../admin/components/sections/packages/PackageStats";
import PackageList from "../../admin/components/sections/packages/PackageList";
import { Button } from "@/components/ui/button";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import useGetQuery from "@/hooks/api/useGetQuery";

export default function Packages() {
  const { data } = useGetQuery({
    endpoint: "/api/v1/package/get-all-admin",
    enabled: true,
    newBaseUrl: true,
    queryKey: ["super_admin", "packages"],
  });

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.packages} />

      <div className="flex items-center justify-between">
        <PageHeader
          icon={Crown}
          title="Packages"
          description="Manage subscription packages shown on the e-Bfinit website"
          showStoreName={false}
        />
        <Button size="sm" asChild className="shrink-0 text-xs">
          <Link to="/packages/add-package">
            <Plus /> Add Package
          </Link>
        </Button>
      </div>

      <PackageStats data={data?.data} />
      <PackageList data={data?.data} />
    </section>
  );
}
