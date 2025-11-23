import { Palette } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import ThemeOverview from "./ThemeOverview";
import ThemeLibrary from "./ThemeLibrary";
import useSelectedStore from "@/hooks/stores/useSelectedStore";
import { DynamicBreadcrumb } from "@/components/admin/DynamicBreadcrumb";

const THEME_BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Themes" },
];

export default function Themes() {
  const { selectedStore } = useSelectedStore();

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={THEME_BREADCRUMB_ITEMS} />

      {/* Page Header */}
      <PageHeader
        icon={Palette}
        title="Themes"
        description="Choose and customize the design for"
      />

      <ThemeOverview />
      {/* <ThemeLibrary /> */}
    </section>
  );
}
