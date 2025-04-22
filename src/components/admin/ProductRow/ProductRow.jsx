import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import ReusableModal from "../modals/ReusableModal";
import DeleteProductModal from "../modals/DeleteProductModal";
import ProductUpdateModal from "../modals/ProductUpdateModal";

export default function ProductRow({ product, storeId }) {
  const {
    productId,
    productName,
    productImage,
    productQuantity,
    productCategory,
    productSubcategory,
    productBrand,
    productPrice,
    productDiscountPrice,
    productStatus,
  } = product;

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
      <tr className="border-y border-neutral-200 text-left">
        <td className="text-sm">
          <div className="flex items-center gap-2.5 py-1.5">
            <img
              src={`https://ecomback.bfinit.com${productImage}`}
              alt=""
              loading="lazy"
              className="size-11 rounded-full object-cover"
            />
            <p>{productName}</p>
          </div>
        </td>
        <td className="text-sm">SJ4961</td>
        <td className="text-sm">{productQuantity}</td>
        <td className="text-sm">255</td>
        <td className="text-sm">{productCategory}</td>
        <td className="text-sm">{productSubcategory}</td>
        <td className="text-sm">{productBrand}</td>
        <td className="text-sm">${productPrice.$numberDecimal}</td>
        <td className="text-sm">${productDiscountPrice.$numberDecimal}</td>
        <td className="text-sm">{productStatus ? "Active" : "Inactive"}</td>
        <td className="text-sm">
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
        <ProductUpdateModal storeId={storeId} productId={productId} />
      </ReusableModal>

      {/* delete modal */}
      <ReusableModal isOpen={isDeleteModalOpen} close={toggleDeleteModal}>
        <DeleteProductModal
          product={product}
          storeId={storeId}
          close={toggleDeleteModal}
        />
      </ReusableModal>
    </>
  );
}
