import useGetQuery from "../../../hooks/queries/useGetQuery";
import BlogRow from "../../../components/admin/BlogRow";
import { FileText } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import useSelectedStore from "@/hooks/stores/useSelectedStore";
import { DynamicBreadcrumb } from "@/components/admin/DynamicBreadcrumb";

const BLOGS_BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Blogs",
    dropdown: [{ label: "Add Blog", href: "/blogs/add" }],
  },
  { label: "Manage Blog" },
];

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
      <DynamicBreadcrumb items={BLOGS_BREADCRUMB_ITEMS} />

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
