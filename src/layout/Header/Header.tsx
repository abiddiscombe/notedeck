import { useLiveQuery } from "dexie-react-hooks";
import { serviceNote } from "../../database/serviceNote";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderBackup } from "./HeaderBackup";
import { HeaderNewNote } from "./HeaderNewNote";
import { HeaderDeleteNotes } from "./HeaderDeleteNotes";
import { HeaderThemeSwitch } from "./HeaderThemeSwitch";
import { HeaderUpdateNotification } from "./HeaderUpdateNotification";
import { HeaderSettings } from "./HeaderSettings";

export function Header() {
    const notes = useLiveQuery(() => serviceNote.list());

    return (
        <header className="flex items-center gap-2 border-b border-b-primary-200 bg-white px-4 py-1.5 dark:border-b-primary-800 dark:bg-primary-900">
            <HeaderLogo />
            <HeaderUpdateNotification />
            {!!notes?.length && (
                <>
                    <HeaderNewNote />
                    <HeaderDeleteNotes />
                </>
            )}
            <HeaderThemeSwitch />
            <HeaderBackup />
            <HeaderSettings />
        </header>
    );
}
