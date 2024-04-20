import { twMerge } from "tailwind-merge";

interface ExternalLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    href: string;
}

export function ExternalLink(p: ExternalLinkProps) {
    const ariaLabel = `${p.children || p.href} (Opens in a New Tab)`;

    const styles = twMerge(
        "underline visited:text-inherit hover:decoration-2",
        p.className,
    );

    return (
        <a
            {...p}
            href={p.href}
            target="_blank"
            className={styles}
            aria-label={ariaLabel}
        >
            {p.children}
        </a>
    );
}
