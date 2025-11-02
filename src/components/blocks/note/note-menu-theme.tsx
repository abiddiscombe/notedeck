import { themes } from "@/utilities/themes";
import { twMerge } from "tailwind-merge";

export function NoteMenuTheme(p: {
  onClick: VoidFunction;
  themeId: string;
  themeIsActive: boolean;
}) {
  const theme = themes[p.themeId];
  const ariaLabel = p.themeIsActive
    ? `Use a ${p.themeId} theme for this note.`
    : `This note is currently using the  ${p.themeId} theme.`;

  const styles = twMerge(
    "rounded-full border border-4 p-2 active:ring-1 active:ring-base-600 dark:active:ring-base-500",
    theme.selectionButton,
    p.themeIsActive && "ring-1 ring-base-800 dark:ring-base-100",
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
