import { twMerge } from "tailwind-merge";
import { Button as _Button } from "@headlessui/react";

const Button = (
  p: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: "sm" | "md" | "lg";
    variant?: "solid" | "ghost" | "minimal" | "destructive";
  },
) => {
  const size = p.size ?? "md";
  const variant = p.variant ?? "minimal";

  return (
    <_Button
      {...p}
      className={twMerge(
        `flex items-center rounded border disabled:pointer-events-none disabled:opacity-30
                [&>svg]:h-3.5`,
        size === "sm" && "h-7 gap-1.5 px-2.5 text-sm",
        size === "md" && "h-8 gap-2.5 px-3 text-sm",
        size === "lg" && "text-md h-10 gap-3 px-4",
        variant === "solid" &&
          "border-neutral-900 bg-neutral-900 text-white data-[hover]:border-neutral-700 data-[hover]:data-[active]:border-neutral-600 data-[hover]:bg-neutral-700 data-[hover]:data-[active]:bg-neutral-600 dark:border-neutral-200 dark:bg-neutral-200 dark:text-neutral-800 dark:data-[hover]:border-neutral-300 dark:data-[hover]:data-[active]:border-neutral-400 dark:data-[hover]:bg-neutral-300 dark:data-[hover]:data-[active]:bg-neutral-400",
        variant === "ghost" &&
          "border-white/0 text-neutral-800 data-[hover]:border-neutral-100 data-[hover]:data-[active]:border-neutral-200 data-[hover]:bg-neutral-100 data-[hover]:data-[active]:bg-neutral-200 dark:text-neutral-200 dark:data-[hover]:border-neutral-700 dark:data-[hover]:data-[active]:border-neutral-600 dark:data-[hover]:bg-neutral-700 dark:data-[hover]:data-[active]:bg-neutral-600",
        variant === "minimal" &&
          "border-neutral-200 text-neutral-800 data-[hover]:bg-neutral-100 data-[hover]:data-[active]:bg-neutral-200 data-[hover]:shadow-sm dark:border-neutral-700 dark:text-neutral-200 dark:data-[hover]:bg-neutral-700 dark:data-[hover]:data-[active]:bg-neutral-600",
        variant === "destructive" &&
          "border-red-600 bg-red-600 text-white data-[hover]:border-red-500 data-[hover]:data-[active]:border-red-400 data-[hover]:bg-red-500 data-[hover]:data-[active]:bg-red-400 data-[hover]:shadow-sm",
        p.className,
      )}
    >
      {p.children}
    </_Button>
  );
};

export default Button;
