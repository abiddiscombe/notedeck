import { twMerge } from "tailwind-merge";

interface ExternalLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    href: string;
}

export function ExternalLink(p: ExternalLinkProps) {
    const ariaLabel = `${p.children || p.href} (Opens in a New Tab)`;

    return (
        <a
            {...p}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className={twMerge(
                "underline visited:text-inherit hover:decoration-2",
                p.className,
            )}
        >
            {p.children}
        </a>
    );
}
