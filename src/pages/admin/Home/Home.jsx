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

  const storeCount = stores?.data?.length > 0 ? stores?.data?.length : 0;
  const storeLimit = user?.data?.storeLimit || 0;

  return (
    <section className="mx-auto max-w-7xl">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-semibold text-gray-900">
          Hi {clientInfo?.data?.clientFname} {clientInfo?.data?.clientLname},
        </h1>
        <p className="text-gray-600">Welcome back to your dashboard</p>
      </div>

      {/* Stores Management Section */}
      <div className="mb-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Manage Stores
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {storeCount} of {storeLimit} stores created
            </p>
          </div>
          <div className="hidden items-center space-x-2 rounded-lg bg-gray-50 px-3 py-2 sm:flex">
            <span className="text-sm font-medium text-gray-700">
              {storeCount}/{storeLimit}
            </span>
            <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-300"
                style={{ width: `${(storeCount / storeLimit) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stores &&
            stores?.data &&
            stores?.data?.length > 0 &&
            stores?.data?.map((store) => (
              <StoreCard key={store?.storeId} storeData={store} />
            ))}

          {storeCount < storeLimit ? <CreateStoreCard /> : <StoreLimitCard />}
        </div>
      </div>

      {/* Quick Navigation Section */}
      <div className="mb-10">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Quick Navigation
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Access your most used features
          </p>
        </div>

        <QuickNavs />
      </div>

      {/* Quick Tips Section */}
      <div className="mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Quick Tips</h2>
          <p className="mt-1 text-sm text-gray-500">
            Learn how to get the most out of Bfinit
          </p>
        </div>
        <QuickTips />
      </div>
    </section>
  );
}
