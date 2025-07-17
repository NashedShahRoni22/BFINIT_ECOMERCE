import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import ReusableModal from "../modals/ReusableModal";
import DeleteProductModal from "../modals/DeleteProductModal";
import ProductUpdateModal from "../modals/ProductUpdateModal";

export default function ProductRow({ product, storeId, currencySymbol }) {
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
      <tr className="group transition-colors duration-200 ease-in-out hover:bg-gray-50">
        {/* Product name & image */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                src={`https://ecomback.bfinit.com${productImage}`}
                alt={productName}
                loading="lazy"
                className="h-12 w-12 rounded-lg border border-gray-200 object-cover shadow-sm"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p
                className="max-w-[200px] truncate text-sm font-medium text-gray-900"
                title={productName}
              >
                {productName}
              </p>
            </div>
          </div>
        </td>

        {/* Price */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-semibold text-gray-900">
            {currencySymbol}
            {productDiscountPrice.$numberDecimal}
          </div>
        </td>

        {/* Stock quantity */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                productQuantity > 10
                  ? "bg-green-100 text-green-800"
                  : productQuantity > 0
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {productQuantity} {productQuantity === 1 ? "unit" : "units"}
            </span>
          </div>
        </td>

        {/* Category */}
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {productCategory}
          </span>
        </td>

        {/* Brand */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {productBrand}
          </div>
        </td>

        {/* Actions */}
        <td className="px-6 py-4 text-center whitespace-nowrap">
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={toggleUpdateModal}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-all duration-200 ease-in-out hover:bg-blue-100 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              title="Edit product"
            >
              <FaRegEdit className="h-4 w-4" />
            </button>

            <button
              onClick={toggleDeleteModal}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-all duration-200 ease-in-out hover:bg-red-100 hover:text-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
              title="Delete product"
            >
              <FaRegTrashAlt className="h-4 w-4" />
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
        <ProductUpdateModal
          storeId={storeId}
          productId={productId}
          close={toggleUpdateModal}
          currencySymbol={currencySymbol}
        />
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
