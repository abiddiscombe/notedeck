import notes from "@/database/notes";
import { APP_INFO } from "@/utilities/constants";
import { useLiveQuery } from "dexie-react-hooks";
import { HeaderBackup } from "./HeaderBackup";
import { HeaderDeleteNotes } from "./HeaderDeleteNotes";
import { HeaderNewNote } from "./HeaderNewNote";
import { HeaderSettings } from "./HeaderSettings";
import { HeaderThemeSwitch } from "./HeaderThemeSwitch";

export function Header() {
  const noteList = useLiveQuery(() => notes.list());

  const userHasNotes = !!noteList?.length;

  return (
    <header className="flex items-center justify-between gap-3 border-b border-b-neutral-200 bg-white px-4 py-1.5 shadow-xs dark:border-b-neutral-800 dark:bg-neutral-900">
      <span
        id="logo"
        className="text-sm font-semibold tracking-tight text-neutral-950 dark:text-neutral-100"
      >
        {APP_INFO.Name}
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
