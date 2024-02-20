import { HeaderLogo } from "./HeaderLogo";
import { HeaderMenu } from "./HeaderMenu";
import { HeaderAddNote } from "./HeaderAddNote";
import { useLiveQuery } from "dexie-react-hooks";
import { noteService } from "../../database/noteService";

export function Header() {
    const notes = useLiveQuery(() => noteService.list());

    // To aid the onboarding journey we hide the
    // "Add Note" button when the user has not
    // created any notes. This also blocks note
    // creation on mobile devices.

    return (
        <header className="flex items-center gap-4 border-b border-b-gray-200 bg-white px-4 py-2">
            <HeaderLogo />
            <hr aria-hidden="true" className="grow border-none" />
            {!!notes?.length && <HeaderAddNote />}
            <HeaderMenu canDeleteNotes={!notes?.length} />
        </header>
    );
}
