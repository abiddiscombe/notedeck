import clsx from "clsx";
import { noteThemes } from "../../utilities/noteThemes";

type NoteMenuThemeProps = {
    onClick: VoidFunction;
    themeId: string;
    themeIsActive: boolean;
};

export function NoteMenuTheme(p: NoteMenuThemeProps) {
    const theme = noteThemes[p.themeId];
    const ariaLabel = p.themeIsActive
        ? `Use a ${p.themeId} theme for this note.`
        : `This note is currently using the  ${p.themeId} theme.`;

    const buttonStyles = clsx(
        "rounded-full border p-3",
        theme.selectionButton,
        p.themeIsActive && "ring-1 ring-primary-800 dark:ring-primary-100",
    );

    return (
        <button
            aria-label={ariaLabel}
            onClick={p.onClick}
            disabled={p.themeIsActive}
            className={buttonStyles}
        />
    );
}
