import { PenSquare } from "lucide-react";
import BlogForm from "../components/sections/add-blog/BlogForm";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import useSelectedStore from "@/hooks/useSelectedStore";
import EmptyStoreState from "../components/EmptyStoreState";

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

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="No Store Selected"
        description="Create a store before publishing blog posts to engage your customers."
      />
    );
  }

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
