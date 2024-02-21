type ButtonProps = {
    variant: "filled" | "outlined" | "destructive";
    onClick: VoidFunction;
    children: React.ReactNode;
};

export function Button(p: ButtonProps) {
    const globalClasses =
        "px-4 py-1.5 text-sm cursor-pointer flex gap-3 items-center border rounded duration-150 hover:shadow-sm";

    switch (p.variant) {
        case "filled":
            return (
                <button
                    onClick={p.onClick}
                    className={`${globalClasses} border-black bg-black text-white hover:border-gray-800 hover:bg-gray-800 active:border-gray-700 active:bg-gray-700`}
                >
                    {p.children}
                </button>
            );

        case "outlined":
            return (
                <button
                    onClick={p.onClick}
                    className={`${globalClasses} border-gray-200 text-gray-800 hover:bg-gray-100 active:bg-gray-200`}
                >
                    {p.children}
                </button>
            );

        case "destructive":
            return (
                <button
                    onClick={p.onClick}
                    className={`${globalClasses} border-red-600 bg-red-600 text-white hover:border-red-500 hover:bg-red-500 active:border-red-400 active:bg-red-400`}
                >
                    {p.children}
                </button>
            );
    }
}
