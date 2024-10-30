const ExternalLink = (
  p: React.HTMLAttributes<HTMLAnchorElement> & {
    href: string;
  },
) => {
  const ariaLabel = `${p.children || p.href} (Opens in a New Tab)`;

  return (
    <a
      {...p}
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="underline visited:text-inherit hover:decoration-2"
    >
      {p.children}
    </a>
  );
};

export default ExternalLink;
