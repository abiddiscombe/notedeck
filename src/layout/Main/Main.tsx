import { useLiveQuery } from "dexie-react-hooks";
import { notesService } from "../../database/notes.service";
import MainOnboarding from "./MainOnboarding";
import Note from "./Note/Note";
import { settingsService } from "../../database/settings.service";
import { SETTINGS_KEYS } from "../../utilities/constants";

const Main = () => {
  const notes = useLiveQuery(() => notesService.list());
  const hideNonPriorityNotes = useLiveQuery(() =>
    settingsService.read(SETTINGS_KEYS.HideNonPriorityNotes),
  );

  if (notes && !notes.length) {
    return <MainOnboarding />;
  }

  const filteredNotes = hideNonPriorityNotes
    ? notes?.filter((note) => note.isPriority)
    : notes;

  return (
    <main className="relative overflow-auto p-2">
      {filteredNotes?.map((note) => <Note key={note.id} noteData={note} />)}
    </main>
  );
};

export default Main;
