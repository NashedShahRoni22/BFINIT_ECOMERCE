import { Eye, LogOut, Monitor, Save, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TopNav({ handleExit }) {
  return (
    <nav className="flex items-center justify-between border-b px-5 py-2.5">
      {/* Left: Store Identity */}
      <div className="flex items-center gap-3">
        <h1 className="text-foreground text-base font-semibold">My Store</h1>
        <div className="bg-border mx-1 h-6 w-px" />
        <span className="text-muted-foreground text-sm">Theme Editor</span>
      </div>

      {/* Center: Device Preview Toggles */}
      <div className="bg-muted/30 flex items-center gap-1 rounded-lg border p-1">
        <Button
          size="sm"
          variant="ghost"
          className="data-[active=true]:bg-background h-8 w-8 p-0 data-[active=true]:shadow-sm"
          data-active="true"
          title="Desktop view"
        >
          <Monitor className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="data-[active=true]:bg-background h-8 w-8 p-0 data-[active=true]:shadow-sm"
          title="Mobile view"
        >
          <Smartphone className="h-4 w-4" />
        </Button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          className="gap-2 text-sm font-medium"
        >
          <Eye className="h-4 w-4" />
          Preview
        </Button>

        <Button size="sm" className="gap-2 text-sm font-medium">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>

        <div className="bg-border mx-1 h-6 w-px" />

        <Button
          onClick={handleExit}
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-destructive h-9 w-9"
          title="Exit editor"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
}
