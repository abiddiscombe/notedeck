import { Button } from "@/components/ui/button";
import notes from "@/database/notes";
import { PlusIcon } from "@heroicons/react/16/solid";

const HeaderNewNote = () => {
  const label = "New Note";

  function handleCreateNote() {
    notes.create({
      theme: "yellow",
      content: "",
      isPriority: false,
      isMonospace: false,
    });
  }

  return (
    <Button
      variant="primary"
      aria-label={label}
      onClick={() => handleCreateNote()}
    >
      <PlusIcon aria-hidden={true} />
      <span className="hidden sm:block">Note</span>
    </Button>
  );
};

export default HeaderNewNote;
