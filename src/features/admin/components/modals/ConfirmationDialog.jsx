import { AlertCircle, AlertTriangle, Info, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const VARIANT_CONFIG = {
  destructive: {
    icon: AlertTriangle,
    iconBg: "bg-destructive/5",
    iconColor: "text-destructive",
    actionVariant: "destructive",
  },
  warning: {
    icon: AlertCircle,
    iconBg: "bg-warning/5",
    iconColor: "text-warning",
    actionVariant: "default",
  },
  info: {
    icon: Info,
    iconBg: "bg-primary/5",
    iconColor: "text-primary",
    actionVariant: "default",
  },
};

export default function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  loadingText = "Processing",
  variant = "destructive",
  children,
}) {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.icon;

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!isLoading) {
          onOpenChange(open);
        }
      }}
    >
      <DialogContent
        onPointerDownOutside={(e) => {
          if (isLoading) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (isLoading) e.preventDefault();
        }}
        className="sm:max-w-[440px] [&>button]:hidden"
      >
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div
              className={`${config.iconBg} flex h-8 w-8 shrink-0 items-center justify-center rounded-full`}
            >
              <Icon className={`${config.iconColor} h-4 w-4`} />
            </div>
            <div className="flex-1 pt-0.5">
              <DialogTitle className="text-sm font-semibold">
                {title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mt-2 text-xs leading-relaxed">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {children && <div className="mt-4">{children}</div>}

        <div className="flex items-center justify-end gap-3">
          <Button
            disabled={isLoading}
            onClick={onCancel}
            size="sm"
            variant="outline"
          >
            {cancelText}
          </Button>
          <Button
            disabled={isLoading}
            onClick={onConfirm}
            size="sm"
            variant={config.actionVariant}
            className="min-w-24"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin" /> {loadingText}
              </>
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
