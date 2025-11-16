import { Surface } from "@/components/elements/core/surface";
import * as services from "@/database/services";
import { useLiveQuery } from "dexie-react-hooks";
import { NoteAdd } from "./items/note-add";
import { NoteDelete } from "./items/note-delete";
import { SettingsPanel } from "./items/settings-panel";

export const NavMenu = () => {
  const notes = useLiveQuery(services.notes.getAll);

  return (
    <Surface
      shadow={true}
      asChild={true}
      className="absolute top-3 right-3 z-1000 flex items-center rounded-full p-1.5"
    >
      <nav>
        {!!notes?.length && (
          <>
            <NoteAdd />
            <NoteDelete />
          </>
        )}
        <SettingsPanel />
      </nav>
    </Surface>
  );
};
