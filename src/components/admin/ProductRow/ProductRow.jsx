import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

export default function ProductRow({ product }) {
  const {
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

  return (
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
          <button className="cursor-pointer rounded-full bg-blue-100 p-2 duration-300 ease-linear hover:bg-blue-200">
            <MdOutlineEdit className="text-dashboard-primary text-xl" />
          </button>
          <button className="cursor-pointer rounded-full bg-red-100 p-2 duration-300 ease-linear hover:bg-red-200">
            <MdOutlineDelete className="text-xl text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
}
