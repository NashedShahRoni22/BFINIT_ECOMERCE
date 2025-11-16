import useGetQuery from "../../../hooks/queries/useGetQuery";
import BlogRow from "../../../components/admin/BlogRow";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";
import { FileText, SlashIcon } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import useSelectedStore from "@/hooks/stores/useSelectedStore";

export default function ManageBlog() {
  const { selectedStore } = useSelectedStore();

  // fetch all blogs of currently selected store
  const { data: blogs } = useGetQuery({
    endpoint: `/blog/all/?storeId=${selectedStore?.storeId}`,
    queryKey: ["blogs", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId,
  });

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Manage Blog</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader
        icon={FileText}
        title="Manage Blogs"
        description="View and manage all blog posts for"
      />

      {/* blogs data table */}
      {blogs && blogs?.data?.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y border-neutral-200">
                <th className="py-2 text-sm font-medium">Thumbnail</th>
                <th className="py-2 text-sm font-medium">Title</th>
                <th className="py-2 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs &&
                blogs?.data?.length > 0 &&
                blogs?.data?.map((blog) => (
                  <BlogRow
                    key={blog.blogId}
                    blog={blog}
                    storeId={selectedStore?.storeId}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
