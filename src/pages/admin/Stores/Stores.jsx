import { Link } from "react-router";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import StoreList from "../../../components/admin/stores/StoreList";
import ListItemSkeleton from "../../../components/admin/loaders/ListItemSkeleton";
import useAuth from "../../../hooks/auth/useAuth";
import useGetStores from "../../../hooks/stores/useGetStores";

export default function Stores() {
  const { user } = useAuth();

  // fetch all stores list
  const { data: stores, isLoading } = useGetStores();

  return (
    <section>
      <PageHeading heading="Manage Stores" />

      {isLoading ? (
        Array.from({ length: 3 }).map((_, i) => <ListItemSkeleton key={i} />)
      ) : (
        <div className="mt-6">
          <div className="flex items-center justify-between gap-8">
            {stores && stores?.data?.length > 0 ? (
              <h5 className="font-semibold">
                Manage Stores{" "}
                {user &&
                  `(${stores?.data?.length || 0}/${user?.data?.storeLimit})`}
              </h5>
            ) : (
              <h5 className="font-semibold">
                No stores found! Please add a new one.
              </h5>
            )}

            {/* create store button */}
            {stores?.data?.length < user?.data?.storeLimit ? (
              <Link
                to="/create-store"
                className="bg-dashboard-primary/90 hover:bg-dashboard-primary cursor-pointer rounded-md px-4 py-2 text-sm text-white transition-all duration-200 ease-in-out"
              >
                + Create New Store
              </Link>
            ) : (
              <Link
                to="https://bfinit.com/contact"
                target="_blanck"
                className="inline-block w-fit rounded-md bg-gradient-to-r from-gray-700 to-gray-800 px-3 py-2 text-center text-xs font-medium text-white shadow-sm transition-all duration-200 ease-linear active:scale-95"
              >
                Upgrade Plan
              </Link>
            )}
          </div>

          {/* stores details table */}
          {stores && stores?.data?.length > 0 && (
            <div className="mt-4 w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-y border-neutral-200">
                    <th className="py-2 text-sm font-medium">Store Name</th>
                    <th className="py-2 text-sm font-medium">Status</th>
                    <th className="py-2 text-sm font-medium">Preview</th>
                    <th className="py-2 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stores?.data?.map((store) => (
                    <StoreList key={store?.storeId} store={store} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
