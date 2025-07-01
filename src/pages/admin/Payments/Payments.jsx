import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import useAuth from "../../../hooks/auth/useAuth";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import StripeRow from "../../../components/admin/StripeRow/StripeRow";
import ListItemSkeleton from "../../../components/admin/loaders/ListItemSkeleton";

export default function Payments() {
  const { user } = useAuth();

  // fetch stripe info of all stores
  const { data, isLoading, isError } = useGetQuery({
    endpoint: `/payments/stripe/client`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["stripeConnectionInfo", user?.token, user?.data?.clientid],
    enabled: !!user?.token && !!user?.data?.clientid,
  });

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <section>
      <PageHeading heading="Payment Integrations" />

      {/* loading animation */}
      {isLoading &&
        Array.from({ length: 4 }).map((_, i) => <ListItemSkeleton key={i} />)}

      {/* store data table */}
      {data && data?.data && data?.data?.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-y border-neutral-200 text-left">
                <th className="px-4 py-2 text-sm font-medium">Store Name</th>
                <th className="px-4 py-2 text-sm font-medium">Status</th>
                <th className="px-4 py-2 text-sm font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.data?.map((store) => (
                <StripeRow
                  key={store?.storeId}
                  store={store}
                  token={user?.token}
                  clientId={user?.data?.clientid}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
