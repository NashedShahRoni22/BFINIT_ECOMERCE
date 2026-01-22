import { PenSquare } from "lucide-react";
import EmptyStoreState from "../components/EmptyStoreState";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import BlogForm from "../components/sections/add-blog/BlogForm";
import useSelectedStore from "@/hooks/useSelectedStore";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import { useParams } from "react-router";
import useGetQuery from "@/hooks/api/useGetQuery";

export default function UpdateBlog() {
  const { id } = useParams();
  const { selectedStore } = useSelectedStore();

  const { data: blogDetails } = useGetQuery({
    endpoint: `/blog/?blogId=${id}`,
    queryKey: ["blog", id],
    enabled: !!id,
  });

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
      <DynamicBreadcrumb items={breadcrubms.addBlog} />

      {/* Page Header */}
      <PageHeader
        icon={PenSquare}
        title="Add Blog"
        description="Create and publish blog content for"
      />

      {/* Blog form */}
      <BlogForm blogDetails={blogDetails?.data} />
    </section>
  );
}
