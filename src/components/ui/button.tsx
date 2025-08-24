import * as _Slot from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const cvaButton = cva(
  "flex h-8 max-h-8 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm border text-sm disabled:cursor-not-allowed disabled:opacity-30 [&>svg]:h-4 [&>svg]:w-4",
  {
    variants: {
      size: {
        text: "px-4",
        icon: "w-8.5 max-w-8.5",
      },
      variant: {
        ghost: [
          "border-transparent bg-transparent",
          "text-neutral-700 enabled:hover:border-neutral-200 enabled:hover:bg-neutral-200 enabled:hover:active:border-neutral-300 enabled:hover:active:bg-neutral-300",
          "dark:text-neutral-200 dark:enabled:hover:border-neutral-700 dark:enabled:hover:bg-neutral-700 dark:enabled:hover:active:border-neutral-600 dark:enabled:hover:active:bg-neutral-600",
        ],
        primary: [
          "border-neutral-950 bg-neutral-950 text-white enabled:hover:border-neutral-800 enabled:hover:bg-neutral-800 enabled:hover:active:border-neutral-700 enabled:hover:active:bg-neutral-400 enabled:hover:active:bg-neutral-700",
          "dark:border-neutral-200 dark:bg-neutral-200 dark:text-neutral-900 dark:enabled:hover:border-neutral-300 dark:enabled:hover:bg-neutral-300 dark:enabled:hover:active:border-neutral-400",
        ],
        secondary: [
          "border-neutral-100 bg-neutral-100 text-neutral-700 enabled:hover:border-neutral-200 enabled:hover:bg-neutral-200 enabled:hover:active:border-neutral-300 enabled:hover:active:bg-neutral-300",
          "dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 dark:enabled:hover:border-neutral-700 dark:enabled:hover:bg-neutral-700 dark:enabled:hover:active:border-neutral-600 dark:enabled:hover:active:bg-neutral-600",
        ],
        destructive: [
          "text-white",
          "border-red-600 bg-red-600 enabled:hover:border-red-700 enabled:hover:bg-red-700 enabled:hover:active:border-red-800 enabled:hover:active:bg-red-800",
          "dark:border-red-700 dark:bg-red-700 dark:enabled:hover:border-red-600 dark:enabled:hover:bg-red-600 dark:enabled:hover:active:border-red-500 dark:enabled:hover:active:bg-red-500",
        ],
      },
    },
    defaultVariants: {
      size: "text",
      variant: "secondary",
    },
  },
);

export function Button({
  size,
  variant,
  asChild,
  className,
  ...passthrough
}: React.ComponentProps<"button"> &
  VariantProps<typeof cvaButton> & {
    asChild?: boolean;
  }) {
  const Component = asChild ? _Slot.Root : "button";

  return (
    <Component
      {...passthrough}
      className={twMerge(
        cvaButton({
          size,
          variant,
          className,
        }),
      )}
    />
  );
}
