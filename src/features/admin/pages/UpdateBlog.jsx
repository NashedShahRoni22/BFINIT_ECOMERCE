import { useParams } from "react-router";
import { PenSquare } from "lucide-react";
import EmptyStoreState from "../components/EmptyStoreState";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import BlogForm from "../components/sections/add-blog/BlogForm";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function UpdateBlog() {
  const { id } = useParams();
  const { activeStore } = useSelectedStore();
  const { data } = useGetQuery({
    endpoint: `/api/v1/general/blog/${activeStore?.id}/${id}`,
    queryKey: ["blog", id],
    isTokenRequired: true,
    enabled: !!id,
  });

  if (!activeStore) {
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
      <BlogForm data={data?.data} />
    </section>
  );
}
