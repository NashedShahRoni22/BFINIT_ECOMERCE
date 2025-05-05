import { useState } from "react";
import { Link } from "react-router";
import { HiOutlineEye } from "react-icons/hi2";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import ReusableModal from "../modals/ReusableModal";
import StoreDeleteModal from "../modals/StoreDeleteModal";

export default function StoreList({ store }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // toggle delete modal
  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };

  return (
    <tr className="border-y border-neutral-200 text-center">
      <td className="text-sm">
        <div className="flex items-center gap-2.5 py-1.5">
          <img
            src={`https://ecomback.bfinit.com${store?.storeLogo}`}
            alt=""
            loading="lazy"
            className="size-11 rounded-full object-cover"
          />
          <p>{store?.storeName}</p>
        </div>
      </td>
      <td className="text-sm">Active</td>
      <td>
        <Link
          to={`/preview/${store?.storeId}`}
          target="_blanck"
          className="flex justify-center"
        >
          <HiOutlineEye className="hover:text-dashboard-primary cursor-pointer text-xl transition-all duration-200 ease-in-out" />
        </Link>
      </td>
      <td className="text-sm">
        <div className="space-x-2">
          <button>
            <Link
              to={`/customize-store/${store?.storeId}`}
              className="cursor-pointer"
            >
              <MdOutlineEdit className="hover:text-dashboard-primary text-xl transition-all duration-200 ease-in-out" />
            </Link>
          </button>

          <button onClick={toggleDeleteModal} className="cursor-pointer">
            <MdOutlineDelete className="text-xl transition-all duration-200 ease-in-out hover:text-red-500" />
          </button>
        </div>

        {/* delete modal */}
        <ReusableModal isOpen={isDeleteModalOpen} close={toggleDeleteModal}>
          <StoreDeleteModal store={store} close={toggleDeleteModal} />
        </ReusableModal>
      </td>
    </tr>
  );
}
