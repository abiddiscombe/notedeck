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
          "ihover:bg-base-100 dark:ihover:bg-base-800 iactive:bg-base-200 dark:iactive:bg-base-700",
          "ihover:border-base-100 dark:ihover:border-base-800 iactive:border-base-200 dark:iactive:border-base-700 border-transparent",
        ],
      },

      {
        variant: "solid",
        disabled: false,
        className: [
          "text-white [&>svg]:text-white",
          "ihover:bg-accent-700 dark:ihover:bg-accent-800 iactive:bg-accent-800 dark:iactive:bg-accent-900 bg-accent-600 dark:bg-accent-700",
          "ihover:border-accent-700 dark:ihover:border-accent-800 iactive:border-accent-800 dark:iactive:border-accent-900 border-accent-600 dark:border-accent-700",
        ],
      },
      {
        variant: "outlined",
        disabled: false,
        className: [
          "text-base-800 dark:text-base-200 [&>svg]:text-base-800 [&>svg]:dark:text-base-200",
          "dark:bg-base-900 ihover:bg-base-100 dark:ihover:bg-base-800 iactive:bg-base-200 dark:iactive:bg-base-700 bg-white",
          "border-base-300 dark:border-base-700",
        ],
      },
      {
        variant: "destructive",
        disabled: false,
        className: [
          "text-white [&>svg]:text-white",
          "ihover:bg-destructive-700 iactive:bg-destructive-800 dark:ihover:bg-destructive-800 dark:iactive:bg-destructive-900 bg-destructive-600 dark:bg-destructive-700",
          "ihover:border-destructive-700 iactive:border-destructive-800 dark:ihover:border-destructive-800 dark:iactive:border-destructive-900 border-destructive-600 dark:border-destructive-700",
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
