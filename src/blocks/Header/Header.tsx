import { useLiveQuery } from "dexie-react-hooks";
import notes from "../../database/notes";
import HeaderLogo from "./HeaderLogo";
import HeaderBackup from "./HeaderBackup";
import HeaderNewNote from "./HeaderNewNote";
import HeaderDeleteNotes from "./HeaderDeleteNotes";
import HeaderThemeSwitch from "./HeaderThemeSwitch";
import HeaderSettings from "./HeaderSettings";
import HeaderHideNonPriorityNotes from "./HeaderHideNonPriorityNotes";

const Header = () => {
  const noteList = useLiveQuery(() => notes.list());

  return (
    <header className="flex items-center gap-2 border-b border-b-neutral-200 bg-white px-4 py-1.5 shadow-sm dark:border-b-neutral-800 dark:bg-neutral-900">
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
