import { themes } from "@/utilities/themes";
import { twMerge } from "tailwind-merge";

export const NoteMenuTheme = (p: {
  onClick: VoidFunction;
  themeId: string;
  themeIsActive: boolean;
}) => {
  const theme = themes[p.themeId];

  const ariaLabel = p.themeIsActive
    ? `Use a ${p.themeId} theme for this note.`
    : `This note is currently using the  ${p.themeId} theme.`;

  return (
    <button
      onClick={p.onClick}
      disabled={p.themeIsActive}
      aria-label={ariaLabel}
      className={twMerge(
        "active:ring-base-600 dark:active:ring-base-500 cursor-pointer rounded-full border-4 p-2 active:ring-1",
        theme.selectionButton,
        p.themeIsActive && "ring-base-800 dark:ring-base-100 ring-1",
      )}
    />
  );
};
