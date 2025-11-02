import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const cvaSpinner = cva(
  "border-t-base-700 animate-spin rounded-full border border-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-4 border-2",
        md: "h-6 w-6 border-2",
        lg: "h-10 w-10 border-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export function Spinner({
  size,
  className,
  ...passthrough
}: Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof cvaSpinner>) {
  return (
    <div
      className={twMerge(cvaSpinner({ size, className }))}
      {...passthrough}
    />
  );
}
