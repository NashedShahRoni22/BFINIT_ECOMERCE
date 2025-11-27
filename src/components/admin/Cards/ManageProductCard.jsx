import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import ReusableModal from "../modals/ReusableModal";
import ProductUpdateModal from "../modals/ProductUpdateModal";
import DeleteProductModal from "../modals/DeleteProductModal";

export default function ManageProductCard({
  product,
  storeId,
  currencySymbol,
}) {
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
      <div className="p-4 transition-colors duration-200 ease-in-out hover:bg-gray-50">
        <div className="flex items-start space-x-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={`https://ecomback.bfinit.com${productImage}`}
              alt={productName}
              loading="lazy"
              className="h-16 w-16 rounded-lg border border-gray-200 object-cover shadow-sm"
            />
          </div>

          {/* Product Details */}
          <div className="min-w-0 flex-1">
            {/* Product Name */}
            <h3 className="mb-1 truncate text-sm font-medium text-gray-900">
              {productName}
            </h3>

            {/* Price */}
            <div className="mb-2 text-lg font-semibold text-gray-900">
              {currencySymbol}
              {productDiscountPrice?.$numberDecimal}
            </div>

            {/* Stock, Category, Brand - Mobile Grid */}
            <div className="mb-3 grid grid-cols-2 gap-2">
              <div>
                <span className="mb-1 block text-xs text-gray-500">Stock</span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    productQuantity > 10
                      ? "bg-green-100 text-green-800"
                      : productQuantity > 0
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {productQuantity}
                </span>
              </div>

              <div>
                <span className="mb-1 block text-xs text-gray-500">
                  Category
                </span>
                <span className="line-clamp-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                  {productCategory}
                </span>
              </div>

              <div className="col-span-2">
                <span className="mb-1 block text-xs text-gray-500">Brand</span>
                <span className="text-sm font-medium text-gray-900">
                  {productBrand}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleUpdateModal}
                className="inline-flex flex-1 items-center justify-center rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-all duration-200 ease-in-out hover:bg-blue-100 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                <FaRegEdit className="mr-2 h-4 w-4" />
                Edit
              </button>

              <button
                onClick={toggleDeleteModal}
                className="inline-flex flex-1 items-center justify-center rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-all duration-200 ease-in-out hover:bg-red-100 hover:text-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
              >
                <FaRegTrashAlt className="mr-2 h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

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
