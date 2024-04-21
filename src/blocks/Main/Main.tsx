import { useLiveQuery } from "dexie-react-hooks";
import { serviceNote } from "../../database/serviceNote";
import { MainOnboarding } from "./MainOnboarding";
import { Note } from "../Note/Note";

export function Main() {
    const notes = useLiveQuery(() => serviceNote.list());

    if (notes && !notes.length) {
        return <MainOnboarding />;
    }

    return (
        <main className="relative overflow-auto p-2">
            {notes?.map((note) => (
                <Note
                    key={note.id}
                    noteData={note}
                />
            ))}
        </main>
    );
}
