import { useState, useEffect } from "react";
import { X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import useTheme from "@/hooks/useTheme";

export default function PreviewModeBar() {
  const { handleTogglePreview } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-4 left-1/2 z-100 -translate-x-1/2 transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0"
      }`}
    >
      <div className="border-border bg-card flex items-center gap-2 rounded-full border px-3 py-1.5 shadow-lg">
        <Badge
          variant="outline"
          className="gap-1.5 border-0 bg-transparent text-xs font-medium hover:bg-transparent"
        >
          <Eye className="h-3.5! w-3.5!" />
          Preview Mode
        </Badge>

        <Separator orientation="vertical" />

        <Button
          onClick={handleTogglePreview}
          size="sm"
          variant="ghost"
          className="hover:bg-accent h-auto gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
        >
          <X className="h-3.5! w-3.5!" />
          Exit
        </Button>
      </div>
    </div>
  );
}
