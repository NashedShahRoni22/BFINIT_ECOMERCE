import QuickNavs from "../../../components/admin/quicknavs/QuickNavs";
import QuickTips from "../../../components/admin/quickTips/QuickTips";
import CreateStoreCard from "../../../components/admin/stores/CreateStoreCard";
import StoreCard from "../../../components/admin/stores/StoreCard";
import StoreLimitCard from "../../../components/admin/stores/StoreLimitCard";
import useAuth from "../../../hooks/auth/useAuth";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import useGetStores from "../../../hooks/stores/useGetStores";

const getProgressGradient = (percentage) => {
  if (percentage <= 60) {
    // Light aqua to aqua
    return `linear-gradient(90deg, rgb(103, 232, 249) 0%, rgb(6, 182, 212) 100%)`;
  } else if (percentage <= 80) {
    // Aqua to deep blue
    return `linear-gradient(90deg, rgb(6, 182, 212) 0%, rgb(37, 99, 235) 100%)`;
  } else {
    // Deep blue to navy
    return `linear-gradient(90deg, rgb(37, 99, 235) 0%, rgb(23, 37, 84) 100%)`;
  }
};

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

  // progress of total store limit
  const progressPercentage = (storeCount / storeLimit) * 100;

  return (
    <section className="mx-auto max-w-7xl">
      {/* Welcome Section */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 text-white">
        <div className="bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%223%22 cy=%223%22 r=%223%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] absolute inset-0 opacity-20"></div>
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">
                Hi {clientInfo?.data?.clientFname}{" "}
                {clientInfo?.data?.clientLname}! 👋
              </h1>
              <p className="text-gray-300">Welcome back to your dashboard</p>
            </div>

            {/* Store Usage Summary */}
            <div className="hidden sm:block">
              <div className="mb-3 text-right">
                <div className="text-2xl font-bold text-white">
                  {storeCount}
                  <span className="text-lg text-gray-300">/{storeLimit}</span>
                </div>
                <div className="text-sm text-gray-400">stores created</div>
              </div>
              <div className="h-2 w-32 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stores Management Section */}
      <div className="mb-10">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Stores</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and create your online stores
          </p>
        </div>

        {/* stores grid container */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stores &&
            stores?.data &&
            stores?.data?.length > 0 &&
            stores?.data?.map((store) => (
              <StoreCard key={store?.storeId} storeData={store} />
            ))}

          {storeCount < storeLimit ? (
            <CreateStoreCard />
          ) : (
            <StoreLimitCard createdStore={stores?.data?.length} />
          )}
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
