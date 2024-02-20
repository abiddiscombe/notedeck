// A series of preconfigured utility classes
// which match different note themes.

type noteThemesType = {
    [key: string]: {
        note: string;
        selectionButton: string;
    };
};

export const noteThemes: noteThemesType = {
    blue: {
        // TailwindCSS Alias For: Sky
        note: "bg-sky-100 [&>div]:bg-sky-200 [&>div]:text-sky-800 focus:[&_textarea]:bg-sky-50 [&_textarea]:text-sky-900",
        selectionButton: "bg-sky-100 hover:bg-sky-200 border-sky-300",
    },
    pink: {
        // TailwindCSS Alias For: Pink
        note: "bg-pink-100 [&>div]:bg-pink-200 [&>div]:text-pink-800 focus:[&_textarea]:bg-pink-50 [&_textarea]:text-pink-900",
        selectionButton: "bg-pink-100 hover:bg-pink-200 border-pink-300",
    },
    green: {
        // TailwindCSS Alias For: Green
        note: "bg-green-100 [&>div]:bg-green-200 [&>div]:text-green-800 focus:[&_textarea]:bg-green-50 [&_textarea]:text-green-900",
        selectionButton: "bg-green-100 hover:bg-green-200 border-green-300",
    },
    yellow: {
        // TailwindCSS Alias For: Amber
        note: "bg-amber-100 [&>div]:bg-amber-200 [&>div]:text-amber-800 focus:[&_textarea]:bg-amber-50 [&_textarea]:text-amber-900",
        selectionButton: "bg-amber-100 hover:bg-amber-200 border-amber-300",
    },
    purple: {
        // TailwindCSS Alias For: Purple
        note: "bg-purple-100 [&>div]:bg-purple-200 [&>div]:text-purple-800 focus:[&_textarea]:bg-purple-50 [&_textarea]:text-purple-900",
        selectionButton: "bg-purple-100 hover:bg-purple-200 border-purple-300",
    },
};
