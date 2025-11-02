import * as _Slot from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const cvaButton = cva(
  "flex h-8 max-h-8 shrink-0 cursor-pointer items-center rounded-sm border text-sm! font-medium! disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        ghost: null,
        primary: null,
        secondary: null,
        destructive: null,
      },
      hasIcon: {
        true: null,
        false: null,
      },
      hasText: {
        true: null,
        false: null,
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
    compoundVariants: [
      {
        hasIcon: [true, false],
        hasText: true,
        className: "gap-2 px-3",
      },
      {
        hasIcon: true,
        hasText: false,
        className: "w-8.5 max-w-8.5 justify-center",
      },
      {
        variant: "ghost",
        className: [
          "text-base-700 dark:text-base-200 bg-transparent",
          "ihover:bg-base-100 dark:ihover:bg-base-800 iactive:bg-base-200 dark:iactive:bg-base-600",
          "ihover:border-base-100 dark:ihover:border-base-800 iactive:border-base-200 dark:iactive:border-base-600 border-transparent",
        ],
      },
      {
        variant: "primary",
        className: [
          "text-white",
          "bg-accent-700 dark:bg-accent-600 ihover:bg-accent-800 dark:ihover:bg-accent-500 iactive:bg-accent-900 dark:iactive:bg-accent-400",
          "border-accent-700 dark:border-accent-600 ihover:border-accent-800 dark:ihover:border-accent-500 iactive:border-accent-900 dark:iactive:border-accent-400",
        ],
      },
      {
        variant: "secondary",
        className: [
          "text-base-700 dark:text-base-200 bg-transparent",
          "ihover:bg-base-100 dark:ihover:bg-base-800 iactive:bg-base-200 dark:iactive:bg-base-600",
          "border-base-200 dark:border-base-700 iactive:border-base-200 dark:iactive:border-base-600",
        ],
      },
      {
        variant: "destructive",
        className: [
          "text-base-100 border-red-600 bg-red-600 not-disabled:hover:border-red-700 not-disabled:hover:bg-red-700 not-disabled:hover:active:border-red-800 not-disabled:hover:active:bg-red-800",
          "dark:text-base-100 dark:border-red-700 dark:bg-red-700 dark:not-disabled:hover:border-red-600 dark:not-disabled:hover:bg-red-600 dark:not-disabled:hover:active:border-red-500 dark:not-disabled:hover:active:bg-red-500",
        ],
      },
    ],
  },
);

export function Button({
  icon,
  variant,
  asChild,
  children,
  className,
  ...passthrough
}: React.ComponentProps<"button"> &
  VariantProps<typeof cvaButton> & {
    icon?: React.ReactElement;
    asChild?: boolean;
  }) {
  const hasIcon = Boolean(icon);
  const hasText = Boolean(children);

  const Component = asChild ? _Slot.Root : "button";

  return (
    <Component
      {...passthrough}
      className={twMerge(
        cvaButton({
          hasIcon,
          hasText,
          variant,
          className,
        }),
      )}
    >
      {icon}
      {children}
    </Component>
  );
}
