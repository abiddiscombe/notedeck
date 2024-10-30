import { useLiveQuery } from "dexie-react-hooks";
import notes from "../../database/notes";
import HeaderLogo from "./HeaderLogo";
import HeaderBackup from "./HeaderBackup";
import HeaderNewNote from "./HeaderNewNote";
import HeaderDeleteNotes from "./HeaderDeleteNotes";
import HeaderThemeSwitch from "./HeaderThemeSwitch";
import HeaderSettings from "./HeaderSettings";
import HeaderHideNonPriorityNotes from "./HeaderHideNonPriorityNotes";
import Banner from "../../components/Banner";
import { APP_INFO } from "../../utilities/constants";

const Header = () => {
  const noteList = useLiveQuery(() => notes.list());
  const isDeprecatingDomain = window.location.host === APP_INFO.AppHostOld;

  return (
    <div>
      {isDeprecatingDomain && (
        <Banner>
          We're moving from{" "}
          <a
            className="underline hover:decoration-2"
            href="https://app.notedeck.dev"
          >
            app.notedeck.dev
          </a>{" "}
          to{" "}
          <a
            className="underline hover:decoration-2"
            href="https://notedeck.dev"
          >
            notedeck.dev
          </a>{" "}
          in December 2024. Please migrate any important notes across using the
          Backup & Restore features. Thank you.
        </Banner>
      )}
      <header className="flex items-center gap-2 border-b border-b-primary-200 bg-white px-4 py-1.5 shadow-sm dark:border-b-primary-800 dark:bg-primary-900">
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
    </div>
  );
};

export default Header;
