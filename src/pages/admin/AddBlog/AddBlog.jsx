import BlogForm from "../../../components/admin/BlogForm";
import useSelectedStore from "@/hooks/stores/useSelectedStore";
import { PenSquare } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import { DynamicBreadcrumb } from "@/components/admin/DynamicBreadcrumb";

const BLOGS_BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Blogs",
    dropdown: [{ label: "Manage Blog", href: "/blogs/manage" }],
  },
  { label: "Add Blog" },
];

export default function AddBlog() {
  const { selectedStore } = useSelectedStore();

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={BLOGS_BREADCRUMB_ITEMS} />

      {/* Page Header */}
      <PageHeader
        icon={PenSquare}
        title="Add Blog"
        description="Create and publish blog content for"
      />

      {/* Blog form */}
      {selectedStore?.storeId && <BlogForm storeId={selectedStore?.storeId} />}
    </section>
  );
}
