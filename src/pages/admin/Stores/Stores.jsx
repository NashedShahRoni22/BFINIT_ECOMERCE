import { Link } from "react-router";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import StoreList from "../../../components/admin/stores/StoreList";
import ListItemSkeleton from "../../../components/admin/loaders/ListItemSkeleton";
import useAuth from "../../../hooks/useAuth";
import useGetStores from "../../../hooks/useGetStores";

export default function Stores() {
  const { user } = useAuth();

  // fetch all stores list
  const { data: stores, isLoading } = useGetStores();

  return (
    <section>
      <PageHeading heading="Manage Stores" />
      {/* stores overveiw */}
      <div className="mt-6">
        <div className="flex items-center justify-between gap-8">
          <h5 className="font-semibold">
            Manage Stores{" "}
            {user &&
              `(${stores?.storeData?.length || 0}/${user?.data?.storeLimit})`}
          </h5>
          <Link
            to="/create-store"
            className="bg-dashboard-primary/90 hover:bg-dashboard-primary cursor-pointer rounded-md px-4 py-2 text-sm text-white transition-all duration-200 ease-in-out"
          >
            + Create New Store
          </Link>
        </div>

        {/* stores details table */}
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
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <ListItemSkeleton key={i} />
                  ))
                : stores?.storeData?.map((store) => (
                    <StoreList key={store?.storeId} store={store} />
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
