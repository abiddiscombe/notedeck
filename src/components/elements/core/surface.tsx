import * as _Slot from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

const cvaSurface = cva(
  "dark:bg-base-900 dark:border-base-700 border-base-300 rounded border bg-white p-6",
  {
    variants: {
      shadow: {
        true: "shadow-md",
        false: null,
      },
    },
    defaultVariants: {
      shadow: false,
    },
  },
);

export const Surface = ({
  shadow,
  asChild,
  className,
  ...passthrough
}: React.ComponentProps<"div"> &
  VariantProps<typeof cvaSurface> & {
    asChild?: boolean;
  }) => {
  const Component = asChild ? _Slot.Root : "div";

  return (
    <Component
      className={twMerge(cvaSurface({ shadow, className }))}
      {...passthrough}
    />
  );
};
