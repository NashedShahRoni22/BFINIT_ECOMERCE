import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

export default function ProductRow() {
  return (
    <tr className="border-y border-neutral-200 text-center">
      <td className="text-sm">
        <div className="flex items-center gap-2.5 py-1.5">
          <img
            src="https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            loading="lazy"
            className="size-11 rounded-full object-cover"
          />
          <p>Bose QuiteComfort Ultra</p>
        </div>
      </td>
      <td className="text-sm">Headphone</td>
      <td className="text-sm">SJ4961</td>
      <td className="text-sm">51/100</td>
      <td className="text-sm">$ 35.00</td>
      <td className="text-sm">Active</td>
      <td className="text-sm">
        <div className="space-x-2">
          <button className="cursor-pointer">
            <MdOutlineEdit className="hover:text-primary text-xl transition-all duration-200 ease-in-out" />
          </button>
          <button className="cursor-pointer">
            <MdOutlineDelete className="text-xl transition-all duration-200 ease-in-out hover:text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
}
