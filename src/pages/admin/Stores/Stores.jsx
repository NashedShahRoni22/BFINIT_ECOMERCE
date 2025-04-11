import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import CreateStoreCard from "../../../components/admin/stores/CreateStoreCard";
import StoreCard from "../../../components/admin/stores/StoreCard";
import useAuth from "../../../hooks/useAuth";
import StoreList from "../../../components/admin/stores/StoreList";

export default function Stores() {
  const { user } = useAuth();

  return (
    <section>
      <PageHeading heading="Manage Stores" />
      {/* stores overveiw */}
      <div className="mt-6">
        <h5 className="font-semibold">
          Manage Stores{" "}
          {user && `(${user?.data?.storeCount}/${user?.data?.storeLimit})`}
        </h5>
        <div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
          {user &&
            user?.data?.EStore &&
            user?.data?.EStore?.length > 0 &&
            user?.data?.EStore?.map((store) => (
              <StoreCard key={store?.storeId} storeData={store} />
            ))}

          {user && user?.data?.TotalstoreCount !== user?.data?.storeLimit && (
            <CreateStoreCard />
          )}
        </div>
      </div>

      {/* stores details table */}
      <div className="mt-6 overflow-x-auto">
        <h5 className="font-semibold">Stores</h5>
        <table className="mt-4 w-full">
          <thead>
            <tr className="border-y border-neutral-200">
              <th className="py-2 text-sm font-medium">Store Name</th>
              <th className="py-2 text-sm font-medium">Status</th>
              <th className="py-2 text-sm font-medium">Preview</th>
              <th className="py-2 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {user?.data?.EStore?.map((store) => (
              <StoreList key={store?.storeId} store={store} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
