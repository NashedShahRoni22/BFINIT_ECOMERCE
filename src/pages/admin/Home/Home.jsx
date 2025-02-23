import QuickNavs from "../../../components/admin/quicknavs/QuickNavs";
import QuickTips from "../../../components/admin/quickTips/QuickTips";
import CreateStoreCard from "../../../components/admin/stores/CreateStoreCard";
import StoreCard from "../../../components/admin/stores/StoreCard";

export default function Home() {
  return (
    <section className="px-5">
      <div className="mt-5">
        <p className="font-semibold">Hi User</p>
      </div>

      <div className="mt-8">
        <h5 className="font-semibold">Manage Stores (2/5) </h5>
        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
          <StoreCard />
          <StoreCard />
          <CreateStoreCard />
        </div>
      </div>

      <div className="mt-8">
        <h5 className="font-semibold">Quick Navigation </h5>
        <div className="mt-4">
          <QuickNavs/>
        </div>
      </div>

      <div className="mt-8">
        <h5 className="font-semibold">Quick Tips </h5>
        <div className="mt-4">
          <QuickTips/>
        </div>
      </div>
    </section>
  );
}
