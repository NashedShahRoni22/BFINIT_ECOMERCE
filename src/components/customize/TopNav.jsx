import { useNavigate, useParams } from "react-router";
import { LogOut, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TopNav({ onSave }) {
  const navigate = useNavigate();
  const { storeId, themesId } = useParams();
  const [isDesktopView, setIsDesktopView] = useState(true);

  // Handle Preview
  const handlePreveiw = () => {
    onSave();
    navigate(`/store/${storeId}/themes/${themesId}/preview`);
  };

  const handleExit = () => {
    navigate("/themes");
  };

  return (
    <nav className="bg-background flex items-center justify-between border-b px-6 py-2.5">
      {/* Left: Store Identity */}
      <div className="flex items-center gap-3">
        <h1 className="text-foreground text-sm font-semibold">My Store</h1>
        <div className="bg-border h-5 w-px" />
        <span className="text-muted-foreground text-xs font-medium">
          Theme Editor
        </span>
      </div>

      {/* Center: Device Preview Toggles */}
      <div className="bg-muted/30 flex items-center gap-0.5 rounded-lg border p-0.5">
        <Button
          onClick={() => setIsDesktopView(true)}
          size="sm"
          variant="ghost"
          className="data-[active=true]:bg-background data-[active=true]:text-foreground text-muted-foreground h-7 w-9 p-0 transition-colors hover:cursor-pointer data-[active=true]:shadow-sm"
          data-active={isDesktopView}
          title="Desktop view"
        >
          <Monitor size={15} />
        </Button>
        <Button
          onClick={() => setIsDesktopView(false)}
          size="sm"
          variant="ghost"
          className="data-[active=true]:bg-background data-[active=true]:text-foreground text-muted-foreground h-7 w-9 p-0 transition-colors hover:cursor-pointer data-[active=true]:shadow-sm"
          data-active={!isDesktopView}
          title="Mobile view"
        >
          <Smartphone size={15} />
        </Button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <Button
          onClick={handlePreveiw}
          size="sm"
          variant="outline"
          className="h-8 cursor-pointer text-xs font-medium"
        >
          Preview
        </Button>

        <Button
          onClick={onSave}
          size="sm"
          className="h-8 cursor-pointer text-xs font-medium"
        >
          Save
        </Button>

        <div className="bg-border mx-1 h-5 w-px" />

        <Button
          onClick={handleExit}
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-destructive h-8 w-8 cursor-pointer transition-colors"
          title="Exit editor"
        >
          <LogOut className="h-[15px] w-[15px]" />
        </Button>
      </div>
    </nav>
  );
}
