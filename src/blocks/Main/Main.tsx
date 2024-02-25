import { useLiveQuery } from "dexie-react-hooks";
import { noteService } from "../../database/noteService";
import { MainOnboarding } from "./MainOnboarding";
import { Note } from "../Note/Note";

export function Main() {
    const notes = useLiveQuery(() => noteService.list());

    if (notes && !notes.length) {
        return <MainOnboarding />;
    }

    return (
        <main className="relative overflow-auto p-2">
            {notes?.map((note) => <Note key={note.id} noteData={note} />)}
        </main>
    );
}
