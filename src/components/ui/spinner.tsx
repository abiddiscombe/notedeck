import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const cvaSpinner = cva(
  "animate-spin rounded-full border border-transparent border-t-neutral-700",
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
