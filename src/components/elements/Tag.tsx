import { twMerge } from "tailwind-merge";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "solid" | "ghost" | "minimal";
    monospace?: boolean;
}

export function Tag(p: TagProps) {
    const variant = p.variant || "minimal";

    return (
        <span
            className={twMerge(
                "rounded-full border px-4 py-1 text-xs",
                p.monospace && "font-mono",
                variant === "solid" &&
                    "border-primary-900 bg-primary-900 text-white dark:border-primary-100 dark:bg-primary-100 dark:text-primary-200",
                variant === "ghost" &&
                    "border-white/0 text-primary-600 dark:text-primary-400",
                variant === "minimal" &&
                    "border-primary-300 text-primary-600 dark:border-primary-700 dark:text-primary-400",
                p.className,
            )}
        >
            {p.children}
        </span>
    );
}
