import { useState } from "react";
import { Edit, Trash } from "lucide-react";
import ReusableModal from "../../modals/ReusableModal";
import BrandUpdateModal from "../../modals/BrandUpdateModal";
import DeleteBrandModal from "../../modals/DeleteBrandModal";

export default function BrandList({ brand, storeId }) {
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
      <li className="flex items-center justify-between border-b border-neutral-200 px-4 py-2 text-neutral-700 last:border-b-0 hover:bg-neutral-50">
        <div className="flex items-center gap-2">
          <img
            src={`${import.meta.env.VITE_BASE_URL}${brand?.image}`}
            alt={brand?.name}
            loading="lazy"
            className="mx-auto size-11 rounded border border-neutral-100 object-contain p-1"
          />
          <p className="text-sm font-medium">{brand?.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleUpdateModal}>
            <Edit className="text-dashboard-primary/75 hover:text-dashboard-primary min-w-fit cursor-pointer text-lg transition-all duration-200 ease-in-out" />
          </button>

          <button onClick={toggleDeleteModal}>
            <Trash className="min-w-fit cursor-pointer text-lg text-red-300 transition-all duration-200 ease-in-out hover:text-red-500" />
          </button>
        </div>
      </li>

      {/* udpate modal */}
      <ReusableModal isOpen={isUpdateModalOpen} close={toggleUpdateModal}>
        <BrandUpdateModal
          brand={brand}
          storeId={storeId}
          close={toggleUpdateModal}
        />
      </ReusableModal>

      {/* delete modal */}
      <ReusableModal isOpen={isDeleteModalOpen} close={toggleDeleteModal}>
        <DeleteBrandModal
          brand={brand}
          storeId={storeId}
          close={toggleDeleteModal}
        />
      </ReusableModal>
    </>
  );
}
