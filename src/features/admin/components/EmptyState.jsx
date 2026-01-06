import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionPath,
  onAction,
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-5 pt-7 pb-12">
      {/* Icon container */}
      <div className="bg-muted/50 mb-3 rounded-full p-3">
        <Icon className="text-muted-foreground size-6" />
      </div>

      {/* Heading */}
      <h3 className="mb-1.5 text-sm font-semibold">{title}</h3>

      {/* Description */}
      <p className="text-muted-foreground mb-6 max-w-md text-center text-xs">
        {description}
      </p>

      {/* Button  */}
      {actionLabel && (
        <Button
          size="sm"
          asChild={!!actionPath}
          onClick={onAction}
          className="text-xs"
        >
          {actionPath ? (
            <Link to={actionPath}>{actionLabel}</Link>
          ) : (
            actionLabel
          )}
        </Button>
      )}
    </div>
  );
}
