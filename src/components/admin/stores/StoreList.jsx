import { Link } from "react-router";
import { HiOutlineEye } from "react-icons/hi2";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import useStoreDelete from "../../../hooks/useStoreDelete";
import useAuth from "../../../hooks/useAuth";

export default function StoreList({ store }) {
  const { user } = useAuth();
  const { mutate } = useStoreDelete({
    clientId: user?.data?.clientid,
    token: user?.token,
  });

  // handle store delete
  const handleDelete = () => {
    const url = `https://ecomback.bfinit.com/ecom/delete/${store?.storeId}`;
    console.log("Deleting store with ID:", store?.storeId);
    console.log("Delete URL:", url);
    console.log("Bearer token:", user?.token);
    mutate(url);
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
        <Link to="/preview/1" className="flex justify-center">
          <HiOutlineEye className="hover:text-dashboard-primary cursor-pointer text-xl transition-all duration-200 ease-in-out" />
        </Link>
      </td>
      <td className="text-sm">
        <div className="space-x-2">
          <button className="cursor-pointer">
            <MdOutlineEdit className="hover:text-dashboard-primary text-xl transition-all duration-200 ease-in-out" />
          </button>
          <button onClick={handleDelete} className="cursor-pointer">
            <MdOutlineDelete className="text-xl transition-all duration-200 ease-in-out hover:text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
}
