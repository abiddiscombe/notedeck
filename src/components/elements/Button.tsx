import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: "sm" | "md" | "lg";
    variant?: "solid" | "ghost" | "minimal" | "destructive";
}

export function Button(p: ButtonProps) {
    const size = p.size ?? "md";
    const variant = p.variant ?? "minimal";

    const styles = twMerge(
        "flex items-center [&>svg]:h-3.5 border rounded disabled:pointer-events-none disabled:opacity-30",
        size === "sm" && "text-sm h-7 px-2.5 gap-1.5",
        size === "md" && "text-sm h-8 px-3 gap-2.5",
        size === "lg" && "text-md h-10 px-4 gap-3",
        variant === "solid" && [
            "hover:shadow-sm",
            "text-white border-primary-900 bg-primary-900 hover:border-primary-700 hover:bg-primary-700 active:border-primary-600 active:bg-primary-600",
            "dark:text-primary-800 dark:border-primary-200 dark:bg-primary-200 dark:hover:border-primary-300 dark:hover:bg-primary-300 dark:active:border-primary-400 dark:active:bg-primary-400",
        ],
        variant === "ghost" && [
            "border-white/0",
            "text-primary-800 hover:bg-primary-100 hover:border-primary-100 active:bg-primary-200 active:border-primary-200",
            "dark:text-primary-200 dark:hover:bg-primary-700 dark:hover:border-primary-700 dark:active:bg-primary-600 dark:active:border-primary-600",
        ],
        variant === "minimal" && [
            "hover:shadow-sm",
            "border-primary-200 text-primary-800 hover:bg-primary-100 active:bg-primary-200",
            "dark:border-primary-700 dark:text-primary-200 dark:hover:bg-primary-700 dark:active:bg-primary-600",
        ],
        variant === "destructive" && [
            "hover:shadow-sm",
            "text-white border-red-600 border-red-500 bg-red-600 hover:border-red-500 hover:bg-red-500 active:border-red-400 active:bg-red-400",
        ],
        p.className,
    );

    return (
        <button
            {...p}
            className={styles}
        >
            {p.children}
        </button>
    );
}
