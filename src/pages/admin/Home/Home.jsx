import QuickNavs from "../../../components/admin/quicknavs/QuickNavs";
import QuickTips from "../../../components/admin/quickTips/QuickTips";
import CreateStoreCard from "../../../components/admin/stores/CreateStoreCard";
import StoreCard from "../../../components/admin/stores/StoreCard";
import StoreLimitCard from "../../../components/admin/stores/StoreLimitCard";
import useAuth from "../../../hooks/auth/useAuth";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import useGetStores from "../../../hooks/stores/useGetStores";

export default function Home() {
  const { user } = useAuth();
  // fetch client info
  const { data: clientInfo } = useGetQuery({
    endpoint: `/clients/${user?.data?.clientid}`,
    token: user?.token,
    queryKey: ["clientInfo", user?.data?.clientid],
    enabled: !!user?.data?.clientid && !!user?.token,
  });

  // fetch stores details
  const { data: stores } = useGetStores();

  return (
    <section className="px-5">
      <div className="mt-5">
        <p className="font-semibold">
          Hi {clientInfo?.data?.clientFname} {clientInfo?.data?.clientLname},
        </p>
      </div>

      <div className="mt-8">
        <h5 className="font-semibold">
          Manage Stores{" "}
          {user &&
            `(${stores?.data?.length > 0 ? stores?.data?.length : 0}/${user?.data?.storeLimit})`}
        </h5>
        <div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
          {stores &&
            stores?.data &&
            stores?.data?.length > 0 &&
            stores?.data?.map((store) => (
              <StoreCard key={store?.storeId} storeData={store} />
            ))}

          {stores?.data?.length < user?.data?.storeLimit ? (
            <CreateStoreCard />
          ) : (
            <StoreLimitCard />
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
