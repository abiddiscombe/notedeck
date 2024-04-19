import clsx from "clsx/lite";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: "sm" | "md" | "lg";
    variant?: "solid" | "ghost" | "minimal" | "destructive";
}

export function Button(p: ButtonProps) {
    const size = p.size ?? "md";
    const variant = p.variant ?? "minimal";

    const buttonStyles = clsx(
        "flex items-center [&>svg]:h-3.5 border rounded disabled:pointer-events-none disabled:opacity-30",
        size === "sm" && "text-sm h-7 px-2.5 has-[svg]:gap-1.5",
        size === "md" && "text-sm h-8 px-3 has-[svg]:gap-2.5",
        size === "lg" && "text-md h-10 px-4 has-[svg]:gap-3",
        variant === "solid" &&
            "text-white dark:text-primary-800 border-primary-900 dark:border-primary-200 bg-primary-900 dark:bg-primary-200 hover:shadow-sm hover:border-primary-700 dark:hover:border-primary-300 hover:bg-primary-700 dark:hover:bg-primary-300 active:border-primary-600 dark:active:border-primary-400 active:bg-primary-600 dark:active:bg-primary-400",
        variant === "ghost" &&
            "border-white/0 text-primary-800 dark:text-primary-200 hover:bg-primary-100 dark:hover:bg-primary-700 hover:border-primary-100 dark:hover:border-primary-700 active:bg-primary-200 dark:active:bg-primary-600 active:border-primary-200 dark:active:border-primary-600",
        variant === "minimal" &&
            "border-primary-200 dark:border-primary-700 text-primary-800 dark:text-primary-200 hover:shadow-sm hover:bg-primary-100 dark:hover:bg-primary-700 active:bg-primary-200 dark:active:bg-primary-600",
        variant === "destructive" &&
            "text-white border-red-600 border-red-500 bg-red-600 hover:shadow-sm hover:border-red-500 hover:bg-red-500 active:border-red-400 active:bg-red-400",
        p.className,
    );

    return (
        <button
            {...p}
            className={buttonStyles}
        >
            {p.children}
        </button>
    );
}
