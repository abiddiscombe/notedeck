import { twMerge } from "tailwind-merge";
import { Button } from "@headlessui/react";

export default (
    p: React.ButtonHTMLAttributes<HTMLButtonElement> & {
        size?: "sm" | "md" | "lg";
        variant?: "solid" | "ghost" | "minimal" | "destructive";
    },
) => {
    const size = p.size ?? "md";
    const variant = p.variant ?? "minimal";

    return (
        <Button
            {...p}
            className={twMerge(
                `flex items-center rounded border disabled:pointer-events-none disabled:opacity-30
                [&>svg]:h-3.5`,
                size === "sm" && "h-7 gap-1.5 px-2.5 text-sm",
                size === "md" && "h-8 gap-2.5 px-3 text-sm",
                size === "lg" && "text-md h-10 gap-3 px-4",
                variant === "solid" &&
                    "border-primary-900 bg-primary-900 text-white data-[hover]:border-primary-700 data-[hover]:data-[active]:border-primary-600 data-[hover]:bg-primary-700 data-[hover]:data-[active]:bg-primary-600 dark:border-primary-200 dark:bg-primary-200 dark:text-primary-800 dark:data-[hover]:border-primary-300 dark:data-[hover]:data-[active]:border-primary-400 dark:data-[hover]:bg-primary-300 dark:data-[hover]:data-[active]:bg-primary-400",
                variant === "ghost" &&
                    "border-white/0 text-primary-800 data-[hover]:border-primary-100 data-[hover]:data-[active]:border-primary-200 data-[hover]:bg-primary-100 data-[hover]:data-[active]:bg-primary-200 dark:text-primary-200 dark:data-[hover]:border-primary-700 dark:data-[hover]:data-[active]:border-primary-600 dark:data-[hover]:bg-primary-700 dark:data-[hover]:data-[active]:bg-primary-600",
                variant === "minimal" &&
                    "border-primary-200 text-primary-800 data-[hover]:bg-primary-100 data-[hover]:data-[active]:bg-primary-200 data-[hover]:shadow-sm dark:border-primary-700 dark:text-primary-200 dark:data-[hover]:bg-primary-700 dark:data-[hover]:data-[active]:bg-primary-600",
                variant === "destructive" &&
                    "border-red-600 bg-red-600 text-white data-[hover]:border-red-500 data-[hover]:data-[active]:border-red-400 data-[hover]:bg-red-500 data-[hover]:data-[active]:bg-red-400 data-[hover]:shadow-sm",
                p.className,
            )}
        >
            {p.children}
        </Button>
    );
};
