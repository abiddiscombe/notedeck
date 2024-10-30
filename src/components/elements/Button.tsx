import { cva } from "class-variance-authority";
import { Button as _Button } from "@headlessui/react";

const Button = (
  p: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: "sm" | "md" | "lg";
    variant?: "solid" | "ghost" | "minimal" | "destructive";
  },
) => {
  const classes = cva(
    "flex items-center rounded border disabled:pointer-events-none disabled:opacity-30 [&>svg]:h-3.5",
    {
      variants: {
        size: {
          sm: "h-7 gap-1.5 px-2.5 text-sm",
          md: "h-8 gap-2.5 px-3 text-sm",
          lg: "text-md h-10 gap-3 px-4",
        },
        variant: {
          ghost:
            "border-white/0 text-primary-800 data-[hover]:border-primary-100 data-[hover]:data-[active]:border-primary-200 data-[hover]:bg-primary-100 data-[hover]:data-[active]:bg-primary-200 dark:text-primary-200 dark:data-[hover]:border-primary-700 dark:data-[hover]:data-[active]:border-primary-600 dark:data-[hover]:bg-primary-700 dark:data-[hover]:data-[active]:bg-primary-600",
          solid:
            "border-primary-900 bg-primary-900 text-white data-[hover]:border-primary-700 data-[hover]:data-[active]:border-primary-600 data-[hover]:bg-primary-700 data-[hover]:data-[active]:bg-primary-600 dark:border-primary-200 dark:bg-primary-200 dark:text-primary-800 dark:data-[hover]:border-primary-300 dark:data-[hover]:data-[active]:border-primary-400 dark:data-[hover]:bg-primary-300 dark:data-[hover]:data-[active]:bg-primary-400",
          minimal:
            "border-primary-200 text-primary-800 data-[hover]:bg-primary-100 data-[hover]:data-[active]:bg-primary-200 data-[hover]:shadow-sm dark:border-primary-700 dark:text-primary-200 dark:data-[hover]:bg-primary-700 dark:data-[hover]:data-[active]:bg-primary-600",
          destructive:
            "border-red-600 bg-red-600 text-white data-[hover]:border-red-500 data-[hover]:data-[active]:border-red-400 data-[hover]:bg-red-500 data-[hover]:data-[active]:bg-red-400 data-[hover]:shadow-sm",
        },
      },
      defaultVariants: {
        size: "md",
        variant: "minimal",
      },
    },
  );

  return (
    <_Button
      {...p}
      className={classes({
        size: p.size,
        variant: p.variant,
        className: p.className,
      })}
    >
      {p.children}
    </_Button>
  );
};

export default Button;
