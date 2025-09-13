import * as _Slot from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const cvaButton = cva(
  "flex h-8 max-h-8 shrink-0 cursor-pointer items-center justify-center rounded-sm border text-sm disabled:cursor-not-allowed disabled:opacity-30",
  {
    variants: {
      ratio: {
        auto: "gap-3 px-3",
        full: "w-full gap-3 px-3",
        square: "w-8.5 max-w-8.5",
      },
      color: {
        neutral: null,
        destructive: null,
      },
      variant: {
        ghost: null,
        primary: null,
        secondary: null,
      },
    },
    defaultVariants: {
      ratio: "auto",
      color: "neutral",
      variant: "secondary",
    },
    compoundVariants: [
      {
        color: "neutral",
        variant: "ghost",
        className: [
          "border-transparent bg-transparent",
          "text-neutral-700 not-disabled:hover:border-neutral-200 not-disabled:hover:bg-neutral-200 not-disabled:hover:active:border-neutral-300 not-disabled:hover:active:bg-neutral-300",
          "dark:text-neutral-200 dark:not-disabled:hover:border-neutral-700 dark:not-disabled:hover:bg-neutral-700 dark:not-disabled:hover:active:border-neutral-600 dark:not-disabled:hover:active:bg-neutral-600",
        ],
      },
      {
        color: "neutral",
        variant: "primary",
        className: [
          "border-neutral-950 bg-neutral-950 text-neutral-100 not-disabled:hover:border-neutral-800 not-disabled:hover:bg-neutral-800 not-disabled:hover:active:border-neutral-700 not-disabled:hover:active:bg-neutral-400 not-disabled:hover:active:bg-neutral-700",
          "dark:border-neutral-200 dark:bg-neutral-200 dark:text-neutral-900 dark:not-disabled:hover:border-neutral-300 dark:not-disabled:hover:bg-neutral-300 dark:not-disabled:hover:active:border-neutral-400 dark:not-disabled:hover:active:bg-neutral-400",
        ],
      },
      {
        color: "neutral",
        variant: "secondary",
        className: [
          "border-neutral-100 bg-neutral-100 text-neutral-700 not-disabled:hover:border-neutral-200 not-disabled:hover:bg-neutral-200 not-disabled:hover:active:border-neutral-300 not-disabled:hover:active:bg-neutral-300",
          "dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 dark:not-disabled:hover:border-neutral-700 dark:not-disabled:hover:bg-neutral-700 dark:not-disabled:hover:active:border-neutral-600 dark:not-disabled:hover:active:bg-neutral-600",
        ],
      },
      {
        color: "destructive",
        variant: "ghost",
        className: [
          "border-transparent bg-transparent",
          "text-red-700 not-disabled:hover:border-red-200 not-disabled:hover:bg-red-200 not-disabled:hover:active:border-red-300 not-disabled:hover:active:bg-red-300",
          "dark:text-red-500 dark:not-disabled:hover:border-red-900 dark:not-disabled:hover:bg-red-900 dark:not-disabled:hover:active:border-red-800 dark:not-disabled:hover:active:bg-red-800",
        ],
      },
      {
        color: "destructive",
        variant: "primary",
        className: [
          "border-red-600 bg-red-600 text-neutral-100 not-disabled:hover:border-red-700 not-disabled:hover:bg-red-700 not-disabled:hover:active:border-red-800 not-disabled:hover:active:bg-red-800",
          "dark:border-red-700 dark:bg-red-700 dark:text-neutral-100 dark:not-disabled:hover:border-red-600 dark:not-disabled:hover:bg-red-600 dark:not-disabled:hover:active:border-red-500 dark:not-disabled:hover:active:bg-red-500",
        ],
      },
      {
        color: "destructive",
        variant: "secondary",
        className: [
          "border-red-100 bg-red-100 text-red-700 not-disabled:hover:border-red-200 not-disabled:hover:bg-red-200 not-disabled:hover:active:border-red-300 not-disabled:hover:active:bg-red-300",
          "dark:border-red-950 dark:bg-red-950 dark:text-red-500 dark:not-disabled:hover:border-red-900 dark:not-disabled:hover:bg-red-900 dark:not-disabled:hover:active:border-red-800 dark:not-disabled:hover:active:bg-red-800",
        ],
      },
    ],
  },
);

export function Button({
  ratio,
  color,
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
          ratio,
          color,
          variant,
          className,
        }),
      )}
    />
  );
}
