import clsx from "clsx";

type NoticeProps = {
    variant: "error" | "warning" | "info";
    children: React.ReactNode;
};

export function Notice(p: NoticeProps) {
    const styles = clsx(
        "my-4 p-4 rounded border border-l-4 text-gray-800",
        p.variant === "info" && "border-sky-400 bg-sky-50",
        p.variant === "error" && "border-red-400 bg-red-50",
        p.variant === "warning" && "border-amber-400 bg-amber-50",
    );

    return (
        <div className={styles} role="alert">
            {p.children}
        </div>
    );
}
