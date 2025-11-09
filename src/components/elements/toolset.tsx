import * as _Slot from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const cvaToolset = cva("flex gap-3", {
  variants: {
    direction: {
      x: "flex-row items-center",
      y: "flex-col items-stretch",
    },
  },
  defaultVariants: {
    direction: "x",
  },
});

export const Toolset = ({
  asChild,
  direction,
  className,
  ...passthrough
}: React.ComponentProps<"div"> &
  VariantProps<typeof cvaToolset> & {
    asChild?: boolean;
  }) => {
  const Component = asChild ? _Slot.Root : "div";

  return (
    <Component
      className={twMerge(cvaToolset({ direction, className }))}
      {...passthrough}
    />
  );
};
