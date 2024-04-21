import { twMerge } from "tailwind-merge";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "solid" | "ghost" | "minimal";
    monospace?: boolean;
}

export function Tag(p: TagProps) {
    const variant = p.variant || "minimal";

    const tagStyles = twMerge(
        "rounded-full border px-4 py-1 text-xs",
        p.monospace && "font-mono",
        variant === "solid" && [
            "text-white border-primary-900 bg-primary-900",
            "dark:text-primary-200 dark:border-primary-100 dark:bg-primary-100",
        ],
        variant === "ghost" && [
            "border-white/0",
            "text-primary-600",
            "dark:text-primary-400",
        ],
        variant === "minimal" && [
            "text-primary-600 border-primary-300",
            "dark:text-primary-400 dark:border-primary-700",
        ],
        p.className,
    );

    return <span className={tagStyles}>{p.children}</span>;
}
