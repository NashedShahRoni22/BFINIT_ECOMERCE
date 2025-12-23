import { Link } from "react-router";
import { ExternalLink, Clock, SlidersHorizontal } from "lucide-react";
import ThemeOverviewSkeleton from "./ThemeOverviewSkeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useGetQuery from "@/hooks/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";
import { timeAgo } from "@/utils/formatDate";

export default function ThemeOverview() {
  const { selectedStore } = useSelectedStore();

  const { data, isLoading } = useGetQuery({
    endpoint: `/store/theme/meta/admin/${selectedStore?.storeId}`,
    token: true,
    clientId: true,
    queryKey: ["admin", "stores", selectedStore?.storeId, "theme", "meta"],
    enabled: !!selectedStore?.storeId,
  });

  const {
    themeName,
    themeDescription,
    themeThumbnailUrl,
    isCustomized,
    updatedAt,
  } = data?.data || {};

  if (isLoading) {
    return <ThemeOverviewSkeleton />;
  }

  return (
    <div className="bg-card grid grid-cols-1 gap-6 rounded-lg border p-5 lg:grid-cols-2">
      {/* Image container */}
      <div className="flex items-center justify-center">
        <div className="relative max-h-[450px] w-full overflow-hidden rounded-lg border">
          <img
            src={`https://ecomback.bfinit.com${themeThumbnailUrl}`}
            alt={`${themeName} theme preview`}
            loading="lazy"
            className="aspect-video w-full object-cover"
          />
        </div>
      </div>

      {/* Theme info container */}
      <div className="flex flex-col gap-4">
        {/* Header with badge */}
        <div className="space-y-2">
          {/* Badge */}
          {isCustomized && (
            <Badge variant="success" showDot>
              Customized
            </Badge>
          )}

          <h2 className="text-foreground text-sm font-semibold">{themeName}</h2>

          <p className="text-muted-foreground max-w-md text-xs leading-relaxed">
            {themeDescription}
          </p>
        </div>

        {/* Metadata */}
        {updatedAt && (
          <div className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
            <Clock className="size-3.5" />
            <span className="mt-0.5">Last updated {timeAgo(updatedAt)}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Button size="sm" asChild className="text-xs">
            <Link to={`/stores/${selectedStore?.storeId}/theme-editor`}>
              <SlidersHorizontal className="size-3.5" />
              Customize Theme
            </Link>
          </Button>

          <Button size="sm" variant="outline" asChild className="text-xs">
            <Link to={`/stores/${selectedStore?.storeId}`}>
              <ExternalLink className="size-3.5" />
              View Store
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
