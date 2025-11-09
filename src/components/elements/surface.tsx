import * as _Slot from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

const cvaSurface = cva(
  [
    "rounded-sm p-6",
    "dark:bg-base-900 bg-white",
    "dark:border-base-700 border-base-200 border",
  ],
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
