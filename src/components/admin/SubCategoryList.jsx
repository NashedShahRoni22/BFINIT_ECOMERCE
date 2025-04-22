import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import ReusableModal from "./modals/ReusableModal";
import UpdateSubCategoryModal from "./modals/UpdateSubCategoryModal";
import DeleteSubCategoryModal from "./modals/DeleteSubCategoryModal";

export default function SubCategoryList({ subCategory, categoryId, storeId }) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(subCategory);

  // close update modal
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  // close delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <li className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 text-neutral-700 last:border-b-0">
        <p className="min-w-fit">{subCategory}</p>

        <div className="flex items-center gap-4">
          <button>
            <FaRegEdit
              className="text-dashboard-primary/75 hover:text-dashboard-primary min-w-fit cursor-pointer text-lg transition-all duration-200 ease-in-out"
              onClick={() => setIsUpdateModalOpen(true)}
            />
          </button>

          <button>
            <FaRegTrashAlt
              className="min-w-fit cursor-pointer text-lg text-red-300 transition-all duration-200 ease-in-out hover:text-red-500"
              onClick={() => setIsDeleteModalOpen(true)}
            />
          </button>
        </div>
      </li>

      {/* update modal */}
      <ReusableModal isOpen={isUpdateModalOpen} close={closeUpdateModal}>
        <UpdateSubCategoryModal
          subCategory={subCategory}
          updatedName={updatedName}
          setUpdatedName={setUpdatedName}
          close={closeUpdateModal}
          categoryId={categoryId}
          storeId={storeId}
        />
      </ReusableModal>

      {/* delete modal */}
      <ReusableModal isOpen={isDeleteModalOpen} close={closeDeleteModal}>
        <DeleteSubCategoryModal
          subCategory={subCategory}
          close={closeDeleteModal}
          categoryId={categoryId}
          storeId={storeId}
        />
      </ReusableModal>
    </>
  );
}
