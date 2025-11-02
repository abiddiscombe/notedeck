import "@/css/main.css";
import noteService from "@/database/notes";
import { useLiveQuery } from "dexie-react-hooks";
import { PlusIcon } from "lucide-react";
import { Header } from "./components/blocks/header/header";
import { Note } from "./components/blocks/note/note";
import { Button } from "./components/elements/button";
import { Icon } from "./components/elements/icon";

function App() {
  const notes = useLiveQuery(() => noteService.list());

  function handleCreateNote() {
    noteService.create({
      theme: "yellow",
      content: "This is your first note! Click here to edit.",
      isMonospace: false,
    });
  }

  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <Header />
      {notes?.length ? (
        <main className="relative overflow-auto p-2">
          {notes?.map((note) => (
            <Note key={note.id} noteData={note} />
          ))}
        </main>
      ) : (
        <main className="grid place-items-center p-6 transition">
          <div className="flex max-w-2xl flex-col items-center">
            <h1 className="text-center">Your Thoughts. Your Space.</h1>
            <p className="max-w-md text-center">
              NoteDeck is a free sticky notes board that works offline. Your
              notes are saved in your browser and <strong>never</strong> leave
              your device.
            </p>
            <Button variant="primary" onClick={() => handleCreateNote()}>
              <Icon>
                <PlusIcon />
              </Icon>
              Create Note
            </Button>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
