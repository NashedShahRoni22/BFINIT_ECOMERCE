import { PenSquare } from "lucide-react";
import BlogForm from "../components/sections/add-blog/BlogForm";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import useSelectedStore from "@/hooks/useSelectedStore";

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
