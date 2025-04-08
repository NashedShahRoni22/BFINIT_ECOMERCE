import QuickNavs from "../../../components/admin/quicknavs/QuickNavs";
import QuickTips from "../../../components/admin/quickTips/QuickTips";
import CreateStoreCard from "../../../components/admin/stores/CreateStoreCard";
import StoreCard from "../../../components/admin/stores/StoreCard";
import useAuth from "../../../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  console.log(user);

  return (
    <section className="px-5">
      <div className="mt-5">
        <p className="font-semibold">Hi User</p>
      </div>

      <div className="mt-8">
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
