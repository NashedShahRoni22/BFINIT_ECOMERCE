import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HiOutlineEye } from "react-icons/hi2";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import useDeleteMutation from "../../../hooks/useDeleteMutation";

export default function StoreList({ store }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  // custom delete hook
  const { mutate } = useDeleteMutation({
    endpoint: `/store/delete/${store?.storeId}`,
    token: user?.token,
  });

  // handle store delete
  const handleDelete = () => {
    mutate(null, {
      onSuccess: () => {
        toast.success("Store deleted successfully!");
        queryClient.invalidateQueries(["stores", user?.data?.clientid]);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    });
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
        <Link to={`/preview/${store?.storeId}`} className="flex justify-center">
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
          <button onClick={handleDelete} className="cursor-pointer">
            <MdOutlineDelete className="text-xl transition-all duration-200 ease-in-out hover:text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
}
