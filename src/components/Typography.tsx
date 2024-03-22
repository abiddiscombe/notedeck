import clsx from "clsx";

type TypographyProps = {
    variant: "h2" | "h3" | "body";
    noMargin?: boolean;
    children: React.ReactNode;
};

export function Typography(p: TypographyProps) {
    // The <h1 /> is reserved for use in logos.

    if (p.variant === "h2") {
        return (
            <h2
                className={clsx(
                    "text-lg font-semibold text-gray-800",
                    !p.noMargin && "mb-4",
                )}
            >
                {p.children}
            </h2>
        );
    }

    if (p.variant === "h3") {
        return (
            <h3
                className={clsx(
                    "font-semibold text-gray-800",
                    !p.noMargin && "mb-2 mt-6",
                )}
            >
                {p.children}
            </h3>
        );
    }

    if (p.variant === "body") {
        return (
            <p
                className={clsx(
                    "leading-2 text-gray-600",
                    !p.noMargin && "mb-2",
                )}
            >
                {p.children}
            </p>
        );
    }

    return null;
}
