import clsx from "clsx";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "solid" | "ghost" | "minimal";
    monospace?: boolean;
}

export function Tag(p: TagProps) {
    const variant = p.variant || "minimal";

    const tagStyles = clsx(
        "rounded-full border px-4 py-1 text-xs",
        p.monospace && "font-mono",
        variant === "solid" &&
            "text-white dark:text-primary-200 border-primary-900 dark:border-primary-100 bg-primary-900 dark:bg-primary-100",
        variant === "ghost" &&
            "text-primary-600 dark:text-primary-400 border-white/0",
        variant === "minimal" &&
            "text-primary-600 dark:text-primary-400 border-primary-300 dark:border-primary-700",
        p.className,
    );

    return <span className={tagStyles}>{p.children}</span>;
}
