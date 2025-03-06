import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import UpdateModal from "../modals/UpdateModal";
import DeleteModal from "../modals/DeleteModal";

export default function EditableListItem({ item }) {
  let [modalState, setModalState] = useState({ update: false, delete: false });

  const openModal = (type) => {
    setModalState((prevState) => ({ ...prevState, [type]: true }));
  };

  const closeModal = (type) => {
    setModalState((prevState) => ({ ...prevState, [type]: false }));
  };

  return (
    <>
      <li className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 text-neutral-700 last:border-b-0">
        <div className="flex items-center gap-0.5">
          {item.img && (
            <img
              src={item.img}
              alt="category icon"
              loading="lazy"
              className="size-9 object-cover"
            />
          )}
          <p>{item.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <FaRegEdit
            onClick={() => openModal("update")}
            className="text-primary/75 hover:text-primary min-w-fit cursor-pointer text-lg transition-all duration-200 ease-in-out"
          />
          <FaRegTrashAlt
            onClick={() => openModal("delete")}
            className="min-w-fit cursor-pointer text-lg text-red-300 transition-all duration-200 ease-in-out hover:text-red-500"
          />
        </div>
      </li>

      {/* Update Confirm Modal */}
      <UpdateModal
        isOpen={modalState.update}
        close={() => closeModal("update")}
        item={item}
      />

      {/* Delete Confirm Modal */}
      <DeleteModal
        isOpen={modalState.delete}
        close={() => closeModal("delete")}
        item={item}
      />
    </>
  );
}
