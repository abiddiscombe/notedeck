// A series of preconfigured utility classes
// which match different note themes.

type noteThemesType = {
    [key: string]: {
        note: string;
        noteOpaque: string;
        selectionButton: string;
    };
};

export const noteThemes: noteThemesType = {
    blue: {
        note: "backdrop-blur-md bg-sky-200/50 [&>div]:bg-sky-400/20 [&>div]:text-sky-900 focus:[&_textarea]:bg-sky-50/40 [&_textarea]:text-sky-950",
        noteOpaque:
            "bg-sky-100 [&>div]:bg-sky-200 [&>div]:text-sky-800 focus:[&_textarea]:bg-sky-50 [&_textarea]:text-sky-900",
        selectionButton: "bg-sky-100 hover:bg-sky-200 border-sky-300",
    },
    pink: {
        note: "backdrop-blur-md bg-pink-200/50 [&>div]:bg-pink-400/20 [&>div]:text-pink-800 focus:[&_textarea]:bg-pink-50/40 [&_textarea]:text-pink-950",
        noteOpaque:
            "bg-pink-100 [&>div]:bg-pink-200 [&>div]:text-pink-800 focus:[&_textarea]:bg-pink-50 [&_textarea]:text-pink-900",
        selectionButton: "bg-pink-100 hover:bg-pink-200 border-pink-300",
    },
    green: {
        note: "backdrop-blur-md bg-green-200/50 [&>div]:bg-green-400/20 [&>div]:text-green-800 focus:[&_textarea]:bg-green-50/40 [&_textarea]:text-green-950",
        noteOpaque:
            "bg-green-100 [&>div]:bg-green-200 [&>div]:text-green-800 focus:[&_textarea]:bg-green-50 [&_textarea]:text-green-900",
        selectionButton: "bg-green-100 hover:bg-green-200 border-green-300",
    },
    yellow: {
        note: "backdrop-blur-md bg-amber-200/50 [&>div]:bg-amber-400/20 [&>div]:text-amber-800 focus:[&_textarea]:bg-amber-50/40 [&_textarea]:text-amber-950",
        noteOpaque:
            "bg-amber-100 [&>div]:bg-amber-200 [&>div]:text-amber-800 focus:[&_textarea]:bg-amber-50 [&_textarea]:text-amber-900",
        selectionButton: "bg-amber-100 hover:bg-amber-200 border-amber-300",
    },
    purple: {
        note: "backdrop-blur-md bg-purple-200/50 [&>div]:bg-purple-400/20 [&>div]:text-purple-800 focus:[&_textarea]:bg-purple-50/40 [&_textarea]:text-purple-950",
        noteOpaque:
            "bg-purple-100 [&>div]:bg-purple-200 [&>div]:text-purple-800 focus:[&_textarea]:bg-purple-50 [&_textarea]:text-purple-900",
        selectionButton: "bg-purple-100 hover:bg-purple-200 border-purple-300",
    },
};
