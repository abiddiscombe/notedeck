import { cx } from "class-variance-authority";
import { themes } from "../../../utilities/themes";

const NoteMenuTheme = (p: {
  onClick: VoidFunction;
  themeId: string;
  themeIsActive: boolean;
}) => {
  const theme = themes[p.themeId];
  const ariaLabel = p.themeIsActive
    ? `Use a ${p.themeId} theme for this note.`
    : `This note is currently using the  ${p.themeId} theme.`;

  const classes = cx(
    "rounded-full border-4 p-2 active:ring-1 active:ring-primary-600 dark:active:ring-primary-500",
    theme.selectionButton,
    p.themeIsActive && "ring-1 ring-primary-800 dark:ring-primary-100",
  );

  return (
    <button
      className={classes}
      onClick={p.onClick}
      disabled={p.themeIsActive}
      aria-label={ariaLabel}
    />
  );
};

export default NoteMenuTheme;
