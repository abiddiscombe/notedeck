import { Logo } from "../../components/Logo";
import { HeaderMenu } from "./HeaderMenu";
import { HeaderAddNote } from "./HeaderAddNote";
import { useLiveQuery } from "dexie-react-hooks";
import { serviceNote } from "../../database/serviceNote";

export function Header() {
    const notes = useLiveQuery(() => serviceNote.list());

    // To aid the onboarding journey we hide the
    // "Add Note" button when the user has not
    // created any notes.

    return (
        <header className="flex items-center gap-4 border-b border-b-gray-200 bg-white px-4 py-2">
            <Logo flexGrow />
            {!!notes?.length && <HeaderAddNote />}
            <HeaderMenu userHasNotes={!notes?.length} />
        </header>
    );
}
