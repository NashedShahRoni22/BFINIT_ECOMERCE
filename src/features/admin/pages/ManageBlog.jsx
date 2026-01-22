import useGetQuery from "@/hooks/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";
import { FileText, Plus, Search } from "lucide-react";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import EmptyStoreState from "../components/EmptyStoreState";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import EmptyState from "../components/EmptyState";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import BlogTableRow from "../components/sections/manage-blog/BlogTableRow";

export default function ManageBlog() {
  const { selectedStore } = useSelectedStore();
  const [search, setSearch] = useState("");

  // fetch all blogs of currently selected store
  const { data: blogsData } = useGetQuery({
    endpoint: `/blog/all/?storeId=${selectedStore?.storeId}`,
    queryKey: ["blogs", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId,
  });

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="No Store Selected"
        description="Create a store to start writing and managing blog content for your audience."
      />
    );
  }

  const blogs = blogsData?.data;
  const hasBlogs = blogs?.length > 0;

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={breadcrubms.manageBlogs} />

      {/* Page Header */}
      <PageHeader
        icon={FileText}
        title="Manage Blogs"
        description="View and manage all blog posts for"
      />

      <div className="bg-card space-y-6 rounded-lg py-5">
        {hasBlogs ? (
          <>
            {/* search and add blog tools */}
            <div className="flex items-center justify-end gap-4 px-5">
              <div className="relative w-full max-w-72">
                <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
                <Input
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search blogs..."
                  value={search}
                  className="pl-7 placeholder:text-xs md:text-xs"
                />
              </div>

              <Button size="sm" asChild className="text-xs">
                <Link to="/blogs/add">
                  <Plus /> Add Blog
                </Link>
              </Button>
            </div>

            {/* blogs table */}
            <Table>
              <TableHeader className="bg-card hover:bg-transparent">
                <TableRow>
                  <TableHead className="h-12 w-10 border border-l-0 text-xs font-semibold">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="border text-xs font-semibold">
                    Blog
                  </TableHead>
                  <TableHead className="border text-xs font-semibold">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {blogs.map((blog) => (
                  <BlogTableRow key={blog.blogId} blog={blog} />
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <EmptyState
            icon={FileText}
            title="No blogs found"
            description="Get started by creating your first blog post"
            actionLabel="Create Blog"
            actionPath="/blogs/add"
          />
        )}
      </div>
    </section>
  );
}
