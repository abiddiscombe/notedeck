import { twMerge } from "tailwind-merge";

export const Typography = {
    H1: _h1,
    H2: _h2,
    H3: _h3,
    Body: _body,
};

interface _genericTypographyProps {
    noMargin?: boolean;
}

interface _h1Props
    extends React.HTMLAttributes<HTMLHeadingElement>,
        _genericTypographyProps {}

interface _h2Props
    extends React.HTMLAttributes<HTMLHeadingElement>,
        _genericTypographyProps {}

interface _h3Props
    extends React.HTMLAttributes<HTMLHeadingElement>,
        _genericTypographyProps {}

interface _bodyProps
    extends React.HTMLAttributes<HTMLParagraphElement>,
        _genericTypographyProps {}

function _h1(p: _h1Props) {
    return (
        <h1
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

function _h2(p: _h2Props) {
    return (
        <h2
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

function _h3(p: _h3Props) {
    return (
        <h3
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

function _body(p: _bodyProps) {
    return (
        <p
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
