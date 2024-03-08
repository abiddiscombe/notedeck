type TypographyProps = {
    variant: "h2" | "body" | "bodyNoMargin" | "small";
    children: React.ReactNode;
};

export function Typography(p: TypographyProps) {
    switch (p.variant) {
        // h1 reserved for <Logo />

        case "h2":
            return (
                <h2 className="mb-4 text-lg font-semibold text-gray-800">
                    {p.children}
                </h2>
            );
        case "body":
            return <p className="leading-2 mb-2 text-gray-600">{p.children}</p>;
        case "bodyNoMargin":
            return <p className="leading-2 text-gray-600">{p.children}</p>;
        case "small":
            return (
                <small className="mb-2 text-sm text-gray-600">
                    {p.children}
                </small>
            );
    }
}
