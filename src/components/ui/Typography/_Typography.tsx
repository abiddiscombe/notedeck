import * as _Slot from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const cvaTypography = cva("", {
  variants: {
    variant: {
      h1: "mb-4 text-xl font-semibold text-neutral-950 dark:text-neutral-100",
      h2: "mb-4 text-lg font-semibold text-neutral-950 dark:text-neutral-100",
      body: "text-md mb-2 text-neutral-700 last-of-type:mb-6 dark:text-neutral-200",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export function Typography({
  variant,
  asChild,
  className,
  ...passthrough
}: React.ComponentProps<"h1"> &
  VariantProps<typeof cvaTypography> & { asChild?: boolean }) {
  const Component = asChild
    ? _Slot.Root
    : variant === "body" || !variant
      ? "p"
      : variant;

  return (
    <Component
      className={twMerge(cvaTypography({ variant, className }))}
      {...passthrough}
    />
  );
}
