import { Palette } from "lucide-react";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import ThemeOverview from "../components/sections/themes/ThemeOverview";
import ThemeLibrary from "../components/sections/themes/ThemeLibrary";

const THEME_BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Themes" },
];

export default function Themes() {
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
