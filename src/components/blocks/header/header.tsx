import notes from "@/database/notes";
import { useLiveQuery } from "dexie-react-hooks";
import { HeaderBackup } from "./header-backup";
import { HeaderDeleteNotes } from "./header-delete-notes";
import { HeaderNewNote } from "./header-new-note";
import { HeaderSettings } from "./header-settings";
import { HeaderThemeSwitch } from "./header-theme";

export function Header() {
  const noteList = useLiveQuery(() => notes.list());

  const userHasNotes = !!noteList?.length;

  return (
    <header className="border-b-base-200 dark:border-b-base-700 dark:bg-base-900 flex items-center justify-between gap-3 border-b bg-white px-4 py-1.5 shadow-xs">
      <span
        id="logo"
        className="text-base-950 dark:text-base-100 text-sm font-semibold tracking-tight"
      >
        NoteDeck
      </span>
      <nav className="flex items-center gap-2">
        {userHasNotes && (
          <>
            <HeaderNewNote />
            <HeaderDeleteNotes />
          </>
        )}
        <HeaderThemeSwitch />
        <HeaderBackup />
        <HeaderSettings />
      </nav>
    </header>
  );
}
