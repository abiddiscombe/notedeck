import { twMerge } from "tailwind-merge";
import { themes } from "./themes";

interface NoteMenuThemeProps {
    onClick: VoidFunction;
    themeId: string;
    themeIsActive: boolean;
}

export function NoteMenuTheme(p: NoteMenuThemeProps) {
    const theme = themes[p.themeId];
    const ariaLabel = p.themeIsActive
        ? `Use a ${p.themeId} theme for this note.`
        : `This note is currently using the  ${p.themeId} theme.`;

    const styles = twMerge(
        "rounded-full border p-3",
        theme.selectionButton,
        p.themeIsActive && "ring-1 ring-primary-800 dark:ring-primary-100",
    );

    return (
        <button
            className={styles}
            onClick={p.onClick}
            disabled={p.themeIsActive}
            aria-label={ariaLabel}
        />
    );
}
