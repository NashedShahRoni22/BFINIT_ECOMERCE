import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import ReusableModal from "./modals/ReusableModal";
import DeleteBlogModal from "./modals/DeleteBlogModal";

export default function BlogRow({ blog, storeId }) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // toggle update modal
  const toggleUpdateModal = () => {
    setIsUpdateModalOpen((prev) => !prev);
  };

  // toggle delete modal
  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };

  return (
    <>
      <tr className="border-y border-neutral-200">
        <td className="py-3">
          <img
            className="mx-auto h-5 w-10 object-contain"
            src={`https://ecomback.bfinit.com${blog?.blogImage}`}
            alt={`image of ${blog?.blogName}`}
          />
        </td>
        <td className="py-3 text-center text-sm font-medium">
          {blog?.blogName}
          {blog.featured && (
            <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
              Featured
            </span>
          )}
        </td>
        <td className="py-3 text-center text-sm">
          <div className="space-x-2">
            <button onClick={toggleUpdateModal}>
              <FaRegEdit className="text-dashboard-primary/75 hover:text-dashboard-primary min-w-fit cursor-pointer text-lg transition-all duration-200 ease-in-out" />
            </button>

            <button onClick={toggleDeleteModal}>
              <FaRegTrashAlt className="min-w-fit cursor-pointer text-lg text-red-300 transition-all duration-200 ease-in-out hover:text-red-500" />
            </button>
          </div>
        </td>
      </tr>

      {/* update modal */}
      <ReusableModal
        isOpen={isUpdateModalOpen}
        close={toggleUpdateModal}
        maxWidth="max-w-[90%]"
      >
        Upate mdoal
      </ReusableModal>

      {/* delete modal */}
      <ReusableModal isOpen={isDeleteModalOpen} close={toggleDeleteModal}>
        <DeleteBlogModal
          blog={blog}
          storeId={storeId}
          close={toggleDeleteModal}
        />
      </ReusableModal>
    </>
  );
}
