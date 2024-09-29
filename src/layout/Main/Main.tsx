import { useLiveQuery } from "dexie-react-hooks";
import { notesService } from "../../database/notes.service";
import MainOnboarding from "./MainOnboarding";
import Note from "./Note/Note";

const Main = () => {
  const notes = useLiveQuery(() => notesService.list());

  if (notes && !notes.length) {
    return <MainOnboarding />;
  }

  return (
    <main className="relative overflow-auto p-2">
      {notes?.map((note) => <Note key={note.id} noteData={note} />)}
    </main>
  );
};

export default Main;
