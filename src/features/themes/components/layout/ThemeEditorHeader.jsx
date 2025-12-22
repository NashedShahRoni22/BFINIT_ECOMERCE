import { useState } from "react";
import { useNavigate } from "react-router";
import { LogOut, Monitor, Smartphone } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import useUpdateMutation from "@/hooks/api/useUpdateMutation";
import useSelectedStore from "@/hooks/useSelectedStore";
import useTheme from "../../hooks/useTheme";

export default function ThemeEditorHeader() {
  const navigate = useNavigate();
  const { selectedStore } = useSelectedStore();
  const { colorTheme, sections, isUploading } = useTheme();

  const [isDesktopView, setIsDesktopView] = useState(true);

  // Update mutation hook for saving customized info
  const { mutateAsync, isPending } = useUpdateMutation({
    endpoint: `/store/theme/update/${selectedStore?.storeId}`,
    token: true,
    clientId: true,
  });

  // save button onClick handler
  const handleSave = () => {
    const payload = {
      theme: colorTheme,
      sections,
    };

    toast.promise(mutateAsync(payload), {
      loading: "Saving theme...",
      success: "Theme saved successfully",
      error: "Failed to save theme",
    });
  };

  // Handle Preview
  const handlePreveiw = () => {
    handleSave();
    // navigate(`/store/${storeId}/themes/${themesId}/preview`);
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
      {/* <div className="bg-muted/30 flex items-center gap-0.5 rounded-lg border p-0.5">
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
      </div> */}

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <Button
          onClick={handlePreveiw}
          size="sm"
          variant="outline"
          disabled={isPending}
          className="h-8 cursor-pointer text-xs font-medium"
        >
          Preview
        </Button>

        <Button
          onClick={handleSave}
          size="sm"
          disabled={isUploading || isPending}
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
