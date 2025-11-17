import * as _Slot from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const cvaToolset = cva("flex gap-3", {
  variants: {
    axis: {
      x: "flex-row items-center",
      y: "flex-col items-stretch",
    },
  },
  defaultVariants: {
    axis: "x",
  },
});

export const Toolset = ({
  axis,
  asChild,
  className,
  ...passthrough
}: React.ComponentProps<"div"> &
  VariantProps<typeof cvaToolset> & {
    asChild?: boolean;
  }) => {
  const Component = asChild ? _Slot.Root : "div";

  return (
    <Component
      className={twMerge(cvaToolset({ axis, className }))}
      {...passthrough}
    />
  );
};
