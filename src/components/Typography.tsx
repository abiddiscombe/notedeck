type TypographyProps = {
    variant: "h1" | "h2" | "body" | "small";
    children: React.ReactNode;
};

export function Typography(p: TypographyProps) {
    switch (p.variant) {
        case "h1":
            // Reserved for logo.
            return (
                <h1 className="select-none font-semibold tracking-wide text-gray-800">
                    {p.children}
                </h1>
            );
        case "h2":
            return (
                <h2 className="mb-4 text-lg font-semibold text-gray-800">
                    {p.children}
                </h2>
            );
        case "body":
            return <p className="leading-2 mb-2 text-gray-600">{p.children}</p>;
        case "small":
            return (
                <small className="mb-2 text-sm text-gray-600">
                    {p.children}
                </small>
            );
    }
}
