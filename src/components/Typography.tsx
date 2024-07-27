import { twMerge } from "tailwind-merge";

const Typography = (
    p: React.HTMLAttributes<HTMLHeadingElement> & {
        variant: "h1" | "h2" | "h3" | "body";
        noMargin?: boolean;
    },
) => {
    if (p.variant === "h1") {
        return (
            <h1
                {...p}
                className={twMerge(
                    "text-sm font-semibold tracking-tight text-primary-800 dark:text-primary-100",
                    !p.noMargin && "mb-10",
                    p.className,
                )}
            >
                {p.children}
            </h1>
        );
    }

    if (p.variant === "h2") {
        return (
            <h2
                {...p}
                className={twMerge(
                    "text-xl font-bold text-primary-900 dark:text-primary-100",
                    !p.noMargin && "mb-4",
                    p.className,
                )}
            >
                {p.children}
            </h2>
        );
    }

    if (p.variant === "h3") {
        return (
            <h3
                {...p}
                className={twMerge(
                    "text-lg font-semibold text-primary-900 dark:text-primary-100",
                    !p.noMargin && "mt-4",
                    p.className,
                )}
            >
                {p.children}
            </h3>
        );
    }

    if (p.variant === "body") {
        return (
            <p
                {...p}
                className={twMerge(
                    "leading-2 text-primary-700 dark:text-primary-200",
                    !p.noMargin && "mb-2",
                    p.className,
                )}
            >
                {p.children}
            </p>
        );
    }

    return null;
};

export default Typography;
