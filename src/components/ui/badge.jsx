import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "justify-center rounded-md border px-2 py-0.5 text-xs font-medium gap-1 border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "justify-center rounded-md border px-2 py-0.5 text-xs font-medium gap-1 border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "justify-center rounded-md border px-2 py-0.5 text-xs font-medium gap-1 border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "justify-center rounded-md border px-2 py-0.5 text-xs font-medium gap-1 text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        active:
          "gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium border-success/20 bg-success/10 text-success",
        inactive:
          "gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium border-muted bg-muted/50 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  showDot = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {showDot && (
        <span
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full",
            variant === "active" && "bg-success",
            variant === "inactive" && "bg-muted-foreground",
          )}
          aria-hidden="true"
        />
      )}
      {props.children}
    </Comp>
  );
}

export { Badge, badgeVariants };
