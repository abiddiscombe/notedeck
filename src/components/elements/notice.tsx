import * as _Slot from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const cvaNotice = cva(
  "text-base-800 dark:text-base-200 rounded-sm border p-4",
  {
    variants: {
      variant: {
        error:
          "border-red-200 bg-red-50 dark:border-red-600 dark:bg-red-900/40",
        warning:
          "border-amber-200 bg-amber-50 dark:border-amber-600 dark:bg-amber-900/40",
        neutral:
          "border-blue-200 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/40",
        success:
          "border-green-200 bg-green-50 dark:border-green-600 dark:bg-green-900/40",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export function Notice({
  variant,
  asChild,
  className,
  ...passthrough
}: React.ComponentProps<"div"> &
  VariantProps<typeof cvaNotice> & { asChild?: boolean }) {
  const Component = asChild ? _Slot.Root : "div";

  return (
    <Component
      className={twMerge(cvaNotice({ variant, className }))}
      {...passthrough}
    />
  );
}
