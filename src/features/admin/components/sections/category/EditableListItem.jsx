import { useState } from "react";
import { Edit, Trash } from "lucide-react";
import UpdateCategoryModal from "../../modals/UpdateCategoryModal";
import DeleteCategoryModal from "../../modals/DeleteCategoryModal";

export default function EditableListItem({ category, selectedStore }) {
  let [modalState, setModalState] = useState({ update: false, delete: false });

  const openModal = (type) => {
    setModalState((prevState) => ({ ...prevState, [type]: true }));
  };

  const closeModal = (type) => {
    setModalState((prevState) => ({ ...prevState, [type]: false }));
  };

  return (
    <>
      <li className="flex items-center justify-between border-b border-neutral-100 px-4 py-2 text-neutral-800 last:border-b-0 hover:bg-neutral-50">
        <div className="flex items-center gap-2">
          <img
            src={`${import.meta.env.VITE_BASE_URL}${category?.image}`}
            alt={category?.name}
            loading="lazy"
            className="mx-auto size-11 rounded border border-neutral-100 object-cover p-1"
          />
          <p className="text-sm font-medium">{category?.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <Edit
            onClick={() => openModal("update")}
            className="text-dashboard-primary/75 hover:text-dashboard-primary min-w-fit cursor-pointer text-lg transition-all duration-200 ease-in-out"
          />
          <Trash
            onClick={() => openModal("delete")}
            className="min-w-fit cursor-pointer text-lg text-red-300 transition-all duration-200 ease-in-out hover:text-red-500"
          />
        </div>
      </li>

      {/* Update Confirm Modal */}
      <UpdateCategoryModal
        isOpen={modalState.update}
        close={() => closeModal("update")}
        item={category}
        selectedStore={selectedStore}
      />

      {/* Delete Confirm Modal */}
      <DeleteCategoryModal
        isOpen={modalState.delete}
        close={() => closeModal("delete")}
        item={category}
        selectedStore={selectedStore}
      />
    </>
  );
}
