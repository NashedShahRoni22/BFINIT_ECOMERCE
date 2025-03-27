import { useState } from "react";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";

export default function ManageBlog() {
  const [selectedStore, setSelectedStore] = useState("all");

  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
  };

  return (
    <section>
      {/* page heading */}
      <PageHeading heading="Manage Blogs" />

      {/* Store Selection */}
      <div className="my-6 flex flex-wrap items-center justify-between">
        {selectedStore === "all" ? (
          <h3 className="text-lg font-semibold">All Store: Blog Management</h3>
        ) : (
          <h3 className="text-lg font-semibold">
            Store {selectedStore}: Blog Management
          </h3>
        )}

        <div className="relative">
          <label htmlFor="storeSelect" className="sr-only">
            Select Store
          </label>
          <select
            id="storeSelect"
            onChange={handleStoreChange}
            className="rounded-md border border-neutral-300 p-2 text-sm focus:outline-none"
          >
            <option value="all">All Stores</option>
            {Array.from({ length: 5 }).map((_, i) => (
              <option key={i} value={i + 1}>
                Store {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* blogs data table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-neutral-200">
              <th className="py-2 text-sm font-medium">Blog ID</th>
              <th className="py-2 text-sm font-medium">Title</th>
              <th className="py-2 text-sm font-medium">Author</th>
              <th className="py-2 text-sm font-medium">Category</th>
              <th className="py-2 text-sm font-medium">Publish Date</th>
              <th className="py-2 text-sm font-medium">Views</th>
              <th className="py-2 text-sm font-medium">Status</th>
              <th className="py-2 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "BLOG-2025",
                title: "10 Tips for E-Commerce Success in 2023",
                author: "Jane Cooper",
                category: "E-Commerce",
                date: "2023-05-01",
                views: "12,845",
                status: "Published",
                featured: true,
              },
              {
                id: "BLOG-2024",
                title: "The Future of Mobile Shopping",
                author: "Robert Fox",
                category: "Technology",
                date: "2023-04-25",
                views: "8,921",
                status: "Published",
                featured: false,
              },
              {
                id: "BLOG-2023",
                title: "SEO Strategies for Online Stores",
                author: "Sarah Wilson",
                category: "Marketing",
                date: "2023-04-18",
                views: "15,302",
                status: "Published",
                featured: true,
              },
              {
                id: "BLOG-2022",
                title: "Product Photography Guide (Draft)",
                author: "Michael Chen",
                category: "Photography",
                date: "2023-05-05",
                views: "—",
                status: "Draft",
                featured: false,
              },
              {
                id: "BLOG-2021",
                title: "Customer Retention Techniques",
                author: "Emily Johnson",
                category: "Business",
                date: "2023-03-30",
                views: "9,456",
                status: "Archived",
                featured: false,
              },
            ].map((blog, i) => (
              <tr key={i} className="border-y border-neutral-200">
                <td className="py-3 text-center text-sm">{blog.id}</td>
                <td className="py-3 text-center text-sm font-medium">
                  {blog.title}
                  {blog.featured && (
                    <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
                      Featured
                    </span>
                  )}
                </td>
                <td className="py-3 text-center text-sm">{blog.author}</td>
                <td className="py-3 text-center text-sm">{blog.category}</td>
                <td className="py-3 text-center text-sm">{blog.date}</td>
                <td className="py-3 text-center text-sm">{blog.views}</td>
                <td className="py-3 text-center text-sm">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      blog.status === "Published"
                        ? "bg-green-100 text-green-800"
                        : blog.status === "Draft"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className="py-3 text-center text-sm">
                  <button className="mr-2 text-blue-600 hover:text-blue-800">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                  {blog.status === "Draft" && (
                    <button className="ml-2 text-green-600 hover:text-green-800">
                      Publish
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
