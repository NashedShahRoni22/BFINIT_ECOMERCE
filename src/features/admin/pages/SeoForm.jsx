import { Search } from "lucide-react";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import EmptyStoreState from "../components/EmptyStoreState";
import PageHeader from "../components/PageHeader";
import TitleDescriptionForm from "../components/sections/seo-form/TitleDescriptionForm";
import useSelectedStore from "@/hooks/useSelectedStore";

const SEO_BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "SEO & Meta" },
];

export default function SeoForm() {
  const { selectedStore } = useSelectedStore();

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="Store Required"
        description="Create a store first to optimize your storefront for search engines."
      />
    );
  }

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={SEO_BREADCRUMB_ITEMS} />

      {/* Page Header */}
      <PageHeader
        icon={Search}
        title="SEO & Meta"
        description="Manage SEO settings and meta tags for"
      />

      {/* Form with preview */}
      <TitleDescriptionForm />
    </section>
  );
}
