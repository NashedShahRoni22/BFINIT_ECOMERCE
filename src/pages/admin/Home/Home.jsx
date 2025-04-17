import QuickNavs from "../../../components/admin/quicknavs/QuickNavs";
import QuickTips from "../../../components/admin/quickTips/QuickTips";
import CreateStoreCard from "../../../components/admin/stores/CreateStoreCard";
import StoreCard from "../../../components/admin/stores/StoreCard";
import useAuth from "../../../hooks/useAuth";
import useGetStores from "../../../hooks/useGetStores";

export default function Home() {
  const { user } = useAuth();
  const { data: stores } = useGetStores();

  return (
    <section className="px-5">
      <div className="mt-5">
        <p className="font-semibold">Hi User</p>
      </div>

      <div className="mt-8">
        <h5 className="font-semibold">
          Manage Stores{" "}
          {user &&
            `(${stores?.storeData?.length > 0 ? stores?.storeData?.length : 0}/${user?.data?.storeLimit})`}
        </h5>
        <div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
          {stores &&
            stores?.storeData &&
            stores?.storeData?.length > 0 &&
            stores?.storeData?.map((store) => (
              <StoreCard key={store?.storeId} storeData={store} />
            ))}

          {user && user?.data?.TotalstoreCount !== user?.data?.storeLimit && (
            <CreateStoreCard />
          )}
        </div>
      </div>

      <div className="mt-8">
        <h5 className="font-semibold">Quick Navigation </h5>
        <div className="mt-4">
          <QuickNavs />
        </div>
      </div>

      <div className="mt-8">
        <h5 className="font-semibold">Quick Tips </h5>
        <div className="mt-4">
          <QuickTips />
        </div>
      </div>
    </section>
  );
}
