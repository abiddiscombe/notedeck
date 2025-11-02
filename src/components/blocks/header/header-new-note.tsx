import { Button } from "@/components/elements/button";
import { Icon } from "@/components/elements/icon";
import notes from "@/database/notes";
import { PlusIcon } from "lucide-react";

export function HeaderNewNote() {
  const label = "New Note";

  function handleCreateNote() {
    notes.create({
      theme: "yellow",
      content: "",
      isMonospace: false,
    });
  }

  return (
    <Button
      icon={
        <Icon>
          <PlusIcon />
        </Icon>
      }
      variant="primary"
      aria-label={label}
      onClick={() => handleCreateNote()}
    >
      Note
    </Button>
  );
}
