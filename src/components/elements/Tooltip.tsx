import { twMerge } from "tailwind-merge";

interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
    label: string;
}

export function Tooltip(p: TooltipProps) {
    const styles = {
        container: "relative group flex flex-col items-center",
        tooltipElement: twMerge(
            "absolute top-10 min-w-28 px-2 py-1 z-50 text-center text-xs border rounded hidden group-hover:block",
            "bg-white text-primary-600 border-primary-200 shadow-sm",
            "dark:text-primary-200 dark:bg-primary-800 dark:border-primary-700",
            p.className,
        ),
    };

    return (
        <div className={styles.container}>
            {p.children}
            <span className={styles.tooltipElement}>{p.label}</span>
        </div>
    );
}
