import * as _Slot from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

const cvaSurface = cva(
  [
    "rounded-sm border p-6",
    "border-neutral-200 bg-white",
    "dark:border-neutral-800 dark:bg-neutral-900",
  ],
  {
    variants: {
      shadow: {
        true: "shadow",
        false: null,
      },
    },
    defaultVariants: {
      shadow: false,
    },
  },
);

export function Surface({
  shadow,
  asChild,
  className,
  ...passthrough
}: React.ComponentProps<"div"> &
  VariantProps<typeof cvaSurface> & {
    asChild?: boolean;
  }) {
  const Component = asChild ? _Slot.Root : "div";

  return (
    <Component
      className={twMerge(cvaSurface({ shadow, className }))}
      {...passthrough}
    />
  );
}
