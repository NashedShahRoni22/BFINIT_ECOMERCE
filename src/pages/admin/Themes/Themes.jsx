import { Link } from "react-router";
import { Palette, SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PageHeader from "@/components/admin/shared/PageHeader";
import ThemeOverview from "./ThemeOverview";
import ThemeLibrary from "./ThemeLibrary";
import useSelectedStore from "@/hooks/stores/useSelectedStore";
import EmptyStoreState from "@/components/admin/shared/EmptyStoreState";

export default function Themes() {
  const { selectedStore } = useSelectedStore();

  // Show empty state if no store selected
  if (!selectedStore) {
    return (
      <EmptyStoreState description="Select a store to customize your themes." />
    );
  }

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Themes</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
