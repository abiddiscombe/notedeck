import { useLiveQuery } from "dexie-react-hooks";
import { noteService } from "../../database/noteService";
import { Note } from "../Note/Note";
import { MainOnboarding } from "./MainOnboarding";
import { MainMobile } from "./MainMobile";

export function Main() {
    const notes = useLiveQuery(() => noteService.list());
    const isMobile = window.innerWidth < 600;

    if (isMobile) {
        return <MainMobile />;
    }

    if (!notes) {
        // Prevents flicker during load due to
        // unpopulated "notes" variable.
        return <main />;
    }

    if (!notes.length) {
        return <MainOnboarding />;
    }

    return (
        <main className="relative overflow-auto p-2">
            {notes.map((note) => (
                <Note key={note.id} noteData={note} />
            ))}
        </main>
    );
}
