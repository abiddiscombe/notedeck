import { useLiveQuery } from "dexie-react-hooks";
import { notesService } from "../../database/notes.service";
import HeaderLogo from "./HeaderLogo";
import HeaderBackup from "./HeaderBackup";
import HeaderNewNote from "./HeaderNewNote";
import HeaderDeleteNotes from "./HeaderDeleteNotes";
import HeaderThemeSwitch from "./HeaderThemeSwitch";
import HeaderSettings from "./HeaderSettings";
import HeaderHideNonPriorityNotes from "./HeaderHideNonPriorityNotes";

const Header = () => {
  const notes = useLiveQuery(() => notesService.list());

  return (
    <header className="flex items-center gap-2 border-b border-b-primary-200 bg-white px-4 py-1.5 shadow-sm dark:border-b-primary-800 dark:bg-primary-900">
      <HeaderLogo />
      {!!notes?.length && (
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
