import { useLiveQuery } from "dexie-react-hooks";
import MainOnboarding from "./MainOnboarding";
import Note from "./Note/Note";
import notes from "../../database/notes";
import settings, { SETTINGS_KEYS } from "../../database/settings";

const Main = () => {
  const noteItems = useLiveQuery(() => notes.list());

  const useOpaqueNotes = useLiveQuery(() =>
    settings.read(SETTINGS_KEYS.UseOpaqueNotes),
  );

  const hideNonPriorityNotes = useLiveQuery(() =>
    settings.read(SETTINGS_KEYS.HideNonPriorityNotes),
  );

  if (noteItems && !noteItems.length) {
    return <MainOnboarding />;
  }

  const filteredNotes = hideNonPriorityNotes
    ? noteItems?.filter((note) => note.isPriority)
    : noteItems;

  return (
    <main className="relative overflow-auto p-2">
      {filteredNotes?.map((note) => (
        <Note key={note.id} noteData={note} useOpaqueNotes={useOpaqueNotes} />
      ))}
    </main>
  );
};

export default Main;
