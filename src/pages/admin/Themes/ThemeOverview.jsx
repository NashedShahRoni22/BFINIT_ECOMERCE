import { Link } from "react-router";
import {
  ExternalLink,
  Palette,
  Smartphone,
  Zap,
  Clock,
  GitBranch,
  UserRound,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useSelectedStore from "@/hooks/stores/useSelectedStore";
import themeImg from "@/assets/themes/theme.jpg";

export default function ThemeOverview() {
  const { selectedStore } = useSelectedStore();

  return (
    <div className="border-border bg-card grid grid-cols-2 gap-8 rounded-lg border p-6">
      {/* Image container */}
      <div className="flex items-center justify-center">
        <img
          src={themeImg}
          alt="Modern Minimal theme preview"
          loading="lazy"
          className="w-full rounded-lg shadow-sm"
        />
      </div>

      {/* Theme info container */}
      <div className="flex flex-col gap-4">
        {/* Header with badge */}
        <div className="space-y-2">
          {/* Active badge */}
          <div className="border-success/20 bg-success/10 text-success inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium">
            <div className="bg-success h-1.5 w-1.5 rounded-full" />
            Active
          </div>

          {/* Inactive badge */}
          {/* <div className="border-muted bg-muted/50 text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium">
            <div className="bg-muted-foreground h-1.5 w-1.5 rounded-full" />
            Inactive
          </div> */}

          <h2 className="text-foreground text-xl font-semibold">
            Modern Minimal
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Clean, minimalist design perfect for fashion, lifestyle, and modern
            brands. Features responsive layout and fast loading times.
          </p>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-secondary text-secondary-foreground inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium">
            <Palette size={13} className="text-muted-foreground" />
            <span>Default</span>
          </div>
          <div className="bg-secondary text-secondary-foreground inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium">
            <Smartphone size={13} className="text-muted-foreground" />
            <span>Responsive</span>
          </div>
          <div className="bg-secondary text-secondary-foreground inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium">
            <Zap size={13} className="text-muted-foreground" />
            <span>Fast Loading</span>
          </div>
        </div>

        {/* Metadata */}
        <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs">
            <Clock size={13} />
            <span>Modified 2 days ago</span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs">
            <GitBranch size={13} />
            <span>Version 2.1.0</span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs">
            <UserRound size={13} />
            <span>By BFINIT</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button size="sm" className="h-8 gap-1.5 text-xs font-medium" asChild>
            <Link to={`/store/${selectedStore.storeId}/themes/themesId/editor`}>
              <SlidersHorizontal size={14} />
              Customize Theme
            </Link>
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1.5 text-xs font-medium"
            asChild
          >
            <Link
              to={`/store/${selectedStore.storeId}/themes/themesId/preview`}
            >
              <ExternalLink size={14} />
              View Store
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
