// A series of preconfigured utility classes
// which match different note themes.

interface themesType {
    [key: string]: {
        note: string;
        noteOpaque: string;
        selectionButton: string;
    };
}

export const themes: themesType = {
    blue: {
        note: "backdrop-blur-md bg-sky-200/50 dark:bg-sky-600/20 [&>div]:bg-sky-400/20 dark:[&>div]:bg-sky-600/40",
        noteOpaque:
            "bg-sky-100 dark:bg-sky-950 [&>div]:bg-sky-200 dark:[&>div]:bg-sky-800",
        selectionButton:
            "bg-sky-100 dark:bg-sky-800 hover:bg-sky-200 dark:hover:bg-sky-700 border-sky-300 dark:border-sky-700",
    },
    pink: {
        note: "backdrop-blur-md bg-pink-200/50 dark:bg-pink-600/20 [&>div]:bg-pink-400/20 dark:[&>div]:bg-pink-600/40",
        noteOpaque:
            "bg-pink-100 dark:bg-pink-950 dark:bg-pink-900 [&>div]:bg-pink-200 dark:[&>div]:bg-pink-800",
        selectionButton:
            "bg-pink-100 dark:bg-pink-800 hover:bg-pink-200 dark:hover:bg-pink-700 border-pink-300 dark:border-pink-700",
    },
    green: {
        note: "backdrop-blur-md bg-green-200/50 dark:bg-green-600/20 [&>div]:bg-green-400/20 dark:[&>div]:bg-green-600/40",
        noteOpaque:
            "bg-green-100 dark:bg-green-950 [&>div]:bg-green-200 dark:[&>div]:bg-green-800",
        selectionButton:
            "bg-green-100 dark:bg-green-800 hover:bg-green-200 dark:hover:bg-green-700 border-green-300 dark:border-green-700",
    },
    yellow: {
        note: "backdrop-blur-md bg-amber-200/50 dark:bg-amber-600/20 [&>div]:bg-amber-400/20 dark:[&>div]:bg-amber-600/40",
        noteOpaque:
            "bg-amber-100 dark:bg-amber-950 [&>div]:bg-amber-200 dark:[&>div]:bg-amber-800",
        selectionButton:
            "bg-amber-100 dark:bg-amber-800 hover:bg-amber-200 dark:hover:bg-amber-700 border-amber-300 dark:border-amber-700",
    },
    purple: {
        note: "backdrop-blur-md bg-purple-200/50 dark:bg-purple-600/20 [&>div]:bg-purple-400/20 dark:[&>div]:bg-purple-600/40",
        noteOpaque:
            "bg-purple-100 dark:bg-purple-950 [&>div]:bg-purple-200 dark:[&>div]:bg-purple-800",
        selectionButton:
            "bg-purple-100 dark:bg-purple-800 hover:bg-purple-200 dark:hover:bg-purple-700 border-purple-300 dark:border-purple-700",
    },
};
