import { Link } from "react-router";
import { ChevronLeft, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyStoreState({
  title = "No store selected",
  description,
  backTo = "/",
  backLabel = "Back to Dashboard",
}) {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
          <Store className="h-8 w-8 text-slate-400" />
        </div>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mb-6 text-sm text-slate-600">{description}</p>
        <Button variant="outline" asChild>
          <Link to={backTo}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            {backLabel}
          </Link>
        </Button>
      </div>
    </div>
  );
}
