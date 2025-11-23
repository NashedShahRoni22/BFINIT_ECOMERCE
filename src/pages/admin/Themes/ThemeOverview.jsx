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
import { Badge } from "@/components/ui/badge";

export default function ThemeOverview() {
  const { selectedStore } = useSelectedStore();

  return (
    <div className="border-border bg-card grid grid-cols-1 gap-6 rounded-lg border p-5 lg:grid-cols-2">
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
          {/* Badge */}
          <Badge variant="active" showDot>
            Active
          </Badge>

          <h2 className="text-foreground text-sm font-semibold">
            Modern Minimal
          </h2>

          <p className="text-muted-foreground text-xs leading-relaxed">
            Clean, minimalist design perfect for fashion, lifestyle, and modern
            brands. Features responsive layout and fast loading times.
          </p>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-secondary text-secondary-foreground inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium">
            <Palette className="text-muted-foreground h-3.5 w-3.5" />
            <span>Default</span>
          </div>
          <div className="bg-secondary text-secondary-foreground inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium">
            <Smartphone className="text-muted-foreground h-3.5 w-3.5" />
            <span>Responsive</span>
          </div>
          <div className="bg-secondary text-secondary-foreground inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium">
            <Zap className="text-muted-foreground h-3.5 w-3.5" />
            <span>Fast Loading</span>
          </div>
        </div>

        {/* Metadata */}
        <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs">
            <Clock className="h-3.5 w-3.5" />
            <span>Modified 2 days ago</span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs">
            <GitBranch className="h-3.5 w-3.5" />
            <span>Version 2.1.0</span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs">
            <UserRound className="h-3.5 w-3.5" />
            <span>By BFINIT</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Button size="sm" asChild>
            <Link to={`/store/${selectedStore.storeId}/themes/themesId/editor`}>
              <SlidersHorizontal />
              Customize Theme
            </Link>
          </Button>

          <Button size="sm" variant="outline" asChild>
            <Link
              to={`/store/${selectedStore.storeId}/themes/themesId/preview`}
            >
              <ExternalLink />
              View Store
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
