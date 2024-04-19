type ExternalLinkProps = {
    href: string;
    children: React.ReactNode;
};

export function ExternalLink(p: ExternalLinkProps) {
    const ariaLabel = `${p.children || p.href} (Opens in a New Tab)`;
    return (
        <a
            href={p.href}
            target="_blank"
            aria-label={ariaLabel}
            className="underline visited:text-inherit hover:decoration-2"
        >
            {p.children}
        </a>
    );
}
