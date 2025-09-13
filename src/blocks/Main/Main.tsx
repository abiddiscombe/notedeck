import notes from "@/database/notes";
import settings, { SETTINGS_KEYS } from "@/database/settings";
import { useLiveQuery } from "dexie-react-hooks";
import { MainOnboarding } from "./MainOnboarding";
import { Note } from "./Note/Note";

export function Main() {
  const noteItems = useLiveQuery(() => notes.list());

  const useOpaqueNotes = useLiveQuery(() =>
    settings.read(SETTINGS_KEYS.UseOpaqueNotes),
  );

  if (noteItems && !noteItems.length) {
    return <MainOnboarding />;
  }

  return (
    <main className="relative overflow-auto p-2">
      {noteItems?.map((note) => (
        <Note key={note.id} noteData={note} useOpaqueNotes={useOpaqueNotes} />
      ))}
    </main>
  );
}
