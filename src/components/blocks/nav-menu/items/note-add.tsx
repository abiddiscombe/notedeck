import { Button } from "@/components/elements/button";
import { Icon } from "@/components/elements/icon";
import * as services from "@/database/services";
import { PlusIcon } from "lucide-react";

export const NoteAdd = () => {
  const createNewNote = () => {
    services.notes.createOne({
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
      variant="primary"
      aria-label="Create Note"
      className="mr-1.5 rounded-full"
      onClick={() => createNewNote()}
    >
      Note
    </Button>
  );
};
