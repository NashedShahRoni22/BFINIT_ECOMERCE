import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function InfoBanner() {
  return (
    <Alert className="has-[>svg]:gap-x-1.5 [&>svg]:size-3.5">
      <Info />
      <AlertTitle className="text-xs">Editing existing article</AlertTitle>
      <AlertDescription className="text-xs">
        Changes will be visible to customers immediately after saving.
      </AlertDescription>
    </Alert>
  );
}
