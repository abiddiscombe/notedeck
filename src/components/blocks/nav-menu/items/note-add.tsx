import { PlusIcon } from "lucide-react";

import { Button } from "#components/elements/button";
import { Icon } from "#components/elements/icon";
import * as services from "#database/services";

export const NoteAdd = () => {
  const createNewNote = () => {
    void services.notes.createOne({
      theme: "yellow",
      content: "",
      isMonospace: false,
    });
  };

  return (
    <Button
      icon={
        <Icon>
          <PlusIcon />
        </Icon>
      }
      variant="solid"
      aria-label="Create Note"
      className="mr-1.5 rounded-full"
      onClick={() => createNewNote()}
    >
      Note
    </Button>
  );
};
