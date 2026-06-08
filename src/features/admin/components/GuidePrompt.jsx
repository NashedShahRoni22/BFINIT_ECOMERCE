import { useEffect, useState } from "react";
import { BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useAuth from "@/hooks/auth/useAuth";

export default function GuidePrompt() {
  const { user } = useAuth();
  const userData = user?.data?.user;

  const [showGuide, setShowGuide] = useState(true);

  const handleGuideClose = () => {
    setShowGuide(false);
    localStorage.setItem(`guideKey_${userData?.id}`, "dismissed");
  };

  useEffect(() => {
    if (!userData?.id) return;
    setShowGuide(
      localStorage.getItem(`guideKey_${userData.id}`) !== "dismissed",
    );
  }, [userData?.id]);

  if (!showGuide) return null;

  return (
    <Card className="border-border bg-card relative">
      {/* Icon Badge */}
      <div className="bg-primary absolute -top-4 left-1/2 flex size-8 -translate-x-1/2 items-center justify-center rounded-full">
        <BookOpen className="text-primary-foreground size-4" />
      </div>

      {/* Close Button */}
      <button
        onClick={handleGuideClose}
        className="bg-background hover:bg-muted focus:ring-ring absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full shadow-md transition-colors hover:cursor-pointer focus:ring-2 focus:outline-none"
        aria-label="Close guide"
      >
        <X className="text-muted-foreground size-3.5" />
      </button>

      <CardContent className="space-y-2.5 py-2">
        <div className="space-y-1 text-center">
          <h3 className="text-xs font-semibold">BFINIT Guide</h3>
          <p className="text-muted-foreground text-[11px] leading-tight">
            How our ecommerce platform works
          </p>
        </div>

        <Button asChild className="h-7 w-full text-xs" size="sm">
          <a
            href="https://ecomback.bfinit.com/uploads/ecom/guide/BFINIT%20E-Commerce%20Guide.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Help Guide
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
