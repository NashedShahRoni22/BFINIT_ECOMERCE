import { useNavigate } from "react-router";
import { Store, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyStoreState({
  title = "No Store Found",
  description = "You need to create a store before accessing this feature.",
  actionText = "Create Your First Store",
  actionPath = "/stores/create",
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-card flex min-h-[calc(100vh-95px)] flex-col items-center justify-center space-y-4 rounded-lg border border-dashed py-8 text-center">
      <div className="bg-muted rounded-full p-4">
        <Store className="text-muted-foreground h-10 w-10" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-muted-foreground max-w-sm text-xs">{description}</p>
      </div>
      <Button
        onClick={() => navigate(actionPath)}
        size="sm"
        className="text-xs"
      >
        <Plus className="h-3.5 w-3.5" />
        {actionText}
      </Button>
    </div>
  );
}
