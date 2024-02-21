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

    return (
        <button
            aria-label={ariaLabel}
            onClick={p.onClick}
            disabled={p.themeIsActive}
            className={clsx(
                "rounded-full border p-3",
                theme.selectionButton,
                p.themeIsActive && "ring-1 ring-gray-800",
            )}
        />
    );
}
