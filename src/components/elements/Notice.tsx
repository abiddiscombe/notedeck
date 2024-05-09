import { twMerge } from "tailwind-merge";

interface NoticeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "info" | "error" | "warning";
}

export function Notice(p: NoticeProps) {
    const variant = p.variant ?? "info";

    return (
        <div
            role="alert"
            className={twMerge(
                "my-4 rounded border border-l-4 p-4 text-primary-800 dark:text-primary-200",
                variant === "info" &&
                    "border-sky-400 bg-sky-50 dark:border-sky-600 dark:bg-sky-900/40",
                variant === "error" &&
                    "border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-900/40",
                variant === "warning" &&
                    "border-amber-400 bg-amber-50 dark:border-amber-600 dark:bg-amber-900/40",
                p.className,
            )}
        >
            {p.children}
        </div>
    );
}
