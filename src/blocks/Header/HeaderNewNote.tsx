import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
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
      variant="primary"
      aria-label={label}
      onClick={() => handleCreateNote()}
    >
      <Icon>
        <PlusIcon />
      </Icon>
      <span>Note</span>
    </Button>
  );
}
