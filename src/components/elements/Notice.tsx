import clsx from "clsx/lite";

interface NoticeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "info" | "error" | "warning";
}

export function Notice(p: NoticeProps) {
    const variant = p.variant ?? "info";

    const noticeStyles = clsx(
        "my-4 p-4 rounded-md border border-l-4 text-primary-800 dark:text-primary-200",
        variant === "info" &&
            "border-sky-400 dark:border-sky-600 bg-sky-50 dark:bg-sky-900/40",
        variant === "error" &&
            "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-900/40",
        variant === "warning" &&
            "border-amber-400 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/40",
        p.className,
    );

    return (
        <div
            role="alert"
            className={noticeStyles}
        >
            {p.children}
        </div>
    );
}
