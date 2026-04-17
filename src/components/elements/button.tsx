import * as _Slot from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const cvaButton = cva(
  "flex h-9 max-h-9 shrink-0 items-center rounded border text-sm font-medium duration-150",
  {
    variants: {
      variant: {
        ghost: null,
        solid: null,
        outlined: null,
        destructive: null,
      },
      _hasIcon: {
        true: null,
        false: null,
      },
      _hasText: {
        true: null,
        false: null,
      },
      disabled: {
        true: "text-base-500 dark:text-base-400 [&>svg]:text-base-500 [&>svg]:dark:text-base-400 cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "outlined",
      disabled: false,
    },
    compoundVariants: [
      {
        _hasIcon: [true, false],
        _hasText: true,
        className: "gap-3 px-4",
      },
      {
        _hasIcon: true,
        _hasText: false,
        className: "w-9 max-w-9 justify-center",
      },
      {
        disabled: true,
        variant: ["solid", "outlined"],
        className: ["border-base-300 dark:border-base-700 border-dashed"],
      },
      {
        disabled: true,
        variant: "ghost",
        className: "border-transparent",
      },
      {
        variant: "ghost",
        disabled: false,
        className: [
          "text-base-800 dark:text-base-200 [&>svg]:text-base-800 [&>svg]:dark:text-base-200",
          "hover:bg-base-100 dark:hover:bg-base-800 active:bg-base-200 dark:active:bg-base-700",
          "hover:border-base-100 dark:hover:border-base-800 active:border-base-200 dark:active:border-base-700 border-transparent",
        ],
      },

      {
        variant: "solid",
        disabled: false,
        className: [
          "text-white [&>svg]:text-white",
          "hover:bg-accent-700 dark:hover:bg-accent-800 active:bg-accent-800 dark:active:bg-accent-900 bg-accent-600 dark:bg-accent-700",
          "hover:border-accent-700 dark:hover:border-accent-800 active:border-accent-800 dark:active:border-accent-900 border-accent-600 dark:border-accent-700",
        ],
      },
      {
        variant: "outlined",
        disabled: false,
        className: [
          "text-base-800 dark:text-base-200 [&>svg]:text-base-800 [&>svg]:dark:text-base-200",
          "dark:bg-base-900 hover:bg-base-100 dark:hover:bg-base-800 active:bg-base-200 dark:active:bg-base-700 bg-white",
          "border-base-300 dark:border-base-700",
        ],
      },
      {
        variant: "destructive",
        disabled: false,
        className: [
          "text-white [&>svg]:text-white",
          "hover:bg-destructive-700 active:bg-destructive-800 dark:hover:bg-destructive-800 dark:active:bg-destructive-900 bg-destructive-600 dark:bg-destructive-700",
          "hover:border-destructive-700 active:border-destructive-800 dark:hover:border-destructive-800 dark:active:border-destructive-900 border-destructive-600 dark:border-destructive-700",
        ],
      },
    ],
  },
);

export const Button = ({
  icon,
  variant,
  asChild,
  children,
  disabled,
  className,
  ...passthrough
}: React.ComponentProps<"button"> &
  VariantProps<typeof cvaButton> & {
    icon?: React.ReactElement;
    asChild?: boolean;
  }) => {
  const Component = asChild ? _Slot.Root : "button";

  return (
    <Component
      {...passthrough}
      disabled={disabled}
      className={twMerge(
        cvaButton({
          _hasIcon: Boolean(icon),
          _hasText: Boolean(children),
          variant,
          disabled,
          className,
        }),
      )}
    >
      {icon}
      {children}
    </Component>
  );
};
