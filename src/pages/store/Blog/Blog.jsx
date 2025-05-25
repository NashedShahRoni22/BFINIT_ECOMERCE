import { Link, useParams } from "react-router";
import { IoBookOutline } from "react-icons/io5";
import { RiArrowRightWideLine } from "react-icons/ri";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import CardSkeleton from "../../../components/admin/loaders/CardSkeleton";

export default function Blog() {
  const { storeId } = useParams();

  const { data: blogData, isLoading } = useGetQuery({
    endpoint: `/blog/all/?storeId=${storeId}`,
    queryKey: ["blogs", storeId],
    enabled: !!storeId,
  });

  return (
    <section className="mx-5 min-h-[calc(100vh-124px)] py-10 md:container md:mx-auto md:py-20">
      {/* loading skeleton */}
      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {blogData && blogData?.data && blogData?.data?.length > 0 ? (
        /* blogs card container */
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {blogData?.data?.map((blog) => (
            /* blog card */
            <article
              key={blog?.blogId}
              className="flex flex-col rounded border border-neutral-200"
            >
              <Link to={`${blog?.blogId}`}>
                <img
                  src={`https://ecomback.bfinit.com${blog?.blogImage}`}
                  alt=""
                  loading="lazy"
                  className="aspect-video h-auto w-full rounded-t object-cover"
                />
              </Link>

              <Link
                to={`${blog?.blogId}`}
                className="hover:text-accent mt-4 w-fit flex-1 px-4 text-xl font-semibold transition-all duration-200 ease-in-out"
              >
                {blog.blogName}
              </Link>

              <div className="flex justify-end p-4">
                <Link
                  to={`${blog?.blogId}`}
                  className="group hover:text-accent flex cursor-pointer items-center gap-1 transition-all duration-200 ease-in-out"
                >
                  Read More{" "}
                  <RiArrowRightWideLine className="mt-0.5 size-4 transition-all duration-200 ease-in-out group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* no blog found ui message */
        <div className="flex flex-col items-center text-center">
          <IoBookOutline className="text-accent/75 size-12" />

          <h3 className="mt-4 text-xl font-medium">No blog posts yet</h3>

          <p className="mt-2 max-w-xl px-4 text-gray-500">
            Our blog is currently being prepared with valuable content.
            <br />
            Please check back soon!
          </p>
        </div>
      )}
    </section>
  );
}
