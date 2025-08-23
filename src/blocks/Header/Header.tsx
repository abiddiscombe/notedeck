import notes from "@/database/notes";
import { useLiveQuery } from "dexie-react-hooks";
import HeaderBackup from "./HeaderBackup";
import HeaderDeleteNotes from "./HeaderDeleteNotes";
import HeaderHideNonPriorityNotes from "./HeaderHideNonPriorityNotes";
import HeaderLogo from "./HeaderLogo";
import HeaderNewNote from "./HeaderNewNote";
import HeaderSettings from "./HeaderSettings";
import HeaderThemeSwitch from "./HeaderThemeSwitch";

const Header = () => {
  const noteList = useLiveQuery(() => notes.list());

  return (
    <header className="flex items-center gap-3 border-b border-b-neutral-200 bg-white px-4 py-1.5 shadow-xs dark:border-b-neutral-800 dark:bg-neutral-900">
      <HeaderLogo />
      {!!noteList?.length && (
        <>
          <HeaderNewNote />
          <HeaderHideNonPriorityNotes />
          <HeaderDeleteNotes />
        </>
      )}
      <HeaderThemeSwitch />
      <HeaderBackup />
      <HeaderSettings />
    </header>
  );
};

export default Header;
