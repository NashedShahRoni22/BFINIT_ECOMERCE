import { Link, useNavigate } from "react-router";
import { ShieldOff, Lock, ArrowLeft, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/auth/useAuth";

export default function Unauthorized() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBack = () => {
    const homePath =
      user?.data?.role === "superadmin" ? "/super-admin/packages" : "/";
    navigate(homePath, { replace: true });
  };

  return (
    <main className="bg-muted flex min-h-screen items-center justify-center p-6">
      <div className="bg-background flex w-full max-w-md flex-col items-center rounded-lg border p-10 text-center">
        <div className="bg-muted mb-5 flex size-13 items-center justify-center rounded-full border">
          <Lock size={20} className="text-muted-foreground" />
        </div>

        <span className="text-muted-foreground bg-muted mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-medium tracking-wide uppercase">
          <ShieldOff size={12} />
          Access restricted
        </span>

        <h1 className="mb-2 text-base leading-snug font-medium">
          You don't have permission to view this page
        </h1>

        <p className="text-muted-foreground mb-6 max-w-xs text-xs leading-relaxed">
          If you think this is a mistake, contact us and we'll help you out.
        </p>

        <Separator className="mb-6" />

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button onClick={handleBack} size="sm">
            <ArrowLeft />
            Back to dashboard
          </Button>

          <Button asChild size="sm" variant="outline">
            <Link
              to="https://bfinit.com/contact"
              target="_blank"
              rel="noreferrer"
            >
              <Headset />
              Contact support
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
