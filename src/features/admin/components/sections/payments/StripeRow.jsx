import usePostMutation from "@/hooks/api/usePostMutation";
import { CircleCheck, CircleX, Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function StripeRow({ store, token, clientId }) {
  const { mutate, isPending } = usePostMutation({
    endpoint: `/payments/stripe/connect/?storeId=${store?.storeId}`,
    token,
    clientId,
  });

  const handleStripeConnect = () => {
    mutate(
      {},
      {
        onSuccess: (data) => {
          window.location.href = data?.url?.url;
        },
        onError: () => {
          toast.error("Somthing went wrong!");
        },
      }
    );
  };

  return (
    <tr className="border-t border-neutral-200 transition-all duration-200 ease-in-out hover:bg-[#f5f6f8]">
      <td className="px-4 py-2 text-sm font-medium whitespace-nowrap">
        <div className="flex flex-wrap gap-1.5">
          <div className="overflow-hidden rounded border border-neutral-200">
            <img
              src={`https://ecomback.bfinit.com${store?.storeLogo}`}
              alt={`image of ${store?.storeName}`}
              loading="lazy"
              className="size-11 object-contain"
            />
          </div>
          <p className="mt-1.5 text-gray-600">{store?.storeName}</p>
        </div>
      </td>
      <td className="px-4 py-2 text-sm font-medium whitespace-nowrap">
        {store?.charges_enabled && store?.payouts_enabled ? (
          <div className="inline-flex w-fit items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-500">
            <CircleCheck className="min-w-fit text-sm" />
            <p>Active</p>
          </div>
        ) : (
          <div className="inline-flex w-fit items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs text-red-500">
            <CircleX className="min-w-fit text-sm" />
            <p>Not Connected</p>
          </div>
        )}
      </td>
      <td className="px-4 py-2 text-xs font-medium whitespace-nowrap">
        {!store?.charges_enabled || !store?.payouts_enabled ? (
          <button
            onClick={handleStripeConnect}
            disabled={isPending}
            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-white transition-all duration-200 ease-in-out ${
              isPending
                ? "bg-[#8a82ff]"
                : "cursor-pointer bg-[#675dff] hover:bg-[#4c42db]"
            }`}
          >
            <Plus className="min-w-fit text-xl" />
            Connect Stripe
          </button>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-500">
            <CircleCheck className="min-w-fit text-sm" /> Active (Stripe
            Connected)
          </span>
        )}
      </td>
    </tr>
  );
}
