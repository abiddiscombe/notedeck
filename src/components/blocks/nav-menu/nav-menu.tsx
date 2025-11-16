import { Surface } from "@/components/elements/core/surface";
import * as services from "@/database/services";
import { useLiveQuery } from "dexie-react-hooks";
import { twMerge } from "tailwind-merge";
import { NoteAdd } from "./items/note-add";
import { NoteDelete } from "./items/note-delete";
import { SettingsPanel } from "./items/settings-panel";

export const NavMenu = () => {
  const notes = useLiveQuery(services.notes.getAll);

  return (
    <Surface
      shadow={true}
      asChild={true}
      className={twMerge(
        "*:animate-in *:slide-in-from-end-2 *:fade-in absolute top-3 right-3 z-1000 flex items-center rounded-full",
        !!notes?.length ? "top-3 right-3 p-1.5" : "top-4.5 right-4.5 p-0",
      )}
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
