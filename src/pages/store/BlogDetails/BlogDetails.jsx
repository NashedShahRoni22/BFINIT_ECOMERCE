import { useParams } from "react-router";
import { ImSpinner } from "react-icons/im";
import useGetQuery from "../../../hooks/queries/useGetQuery";

export default function BlogDetails() {
  const { blogId } = useParams();
  const { data: blogDetails, isLoading } = useGetQuery({
    endpoint: `/blog/?blogId=${blogId}`,
    queryKey: ["blogDetails", blogId],
    enabled: !!blogId,
  });

  return (
    <section
      id="preview"
      className="min-h-[calc(100vh-124px)] px-5 py-10 md:container md:mx-auto md:py-20"
    >
      {isLoading ? (
        <div className="flex min-h-[calc(100vh-124px)] items-center justify-center">
          <ImSpinner className="text-accent size-10 animate-spin" />
        </div>
      ) : (
        <div className="mx-auto max-w-4xl">
          {/* Featured Image */}
          <div className="overflow-hidden rounded-lg">
            <img
              src={
                blogDetails &&
                blogDetails?.data?.blogImage?.length > 0 &&
                `https://ecomback.bfinit.com${blogDetails?.data?.blogImage[0]}`
              }
              alt=""
              loading="lazy"
              className="h-auto max-h-96 w-full object-cover"
            />
          </div>

          {/* Blog Title */}
          <h1 className="mt-8 text-3xl font-bold md:text-4xl lg:text-5xl">
            {blogDetails?.data?.blogName}
          </h1>

          {/* Blog Content */}
          <div
            id="preview"
            dangerouslySetInnerHTML={{
              __html: blogDetails?.data?.blogDescription,
            }}
            className="mt-6"
          />

          {/* Back Button */}
          <div className="mt-10">
            <button
              onClick={() => window.history.back()}
              className="bg-primary text-on-primary cursor-pointer rounded px-4 py-2"
            >
              ← Back to Blogs
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
