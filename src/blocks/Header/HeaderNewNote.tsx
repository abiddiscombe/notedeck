import { PlusIcon } from "@heroicons/react/16/solid";
import Button from "../../components/Button";
import Tooltip from "../../components/Tooltip";
import notes from "../../database/notes";

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
    <Tooltip label={label} className="sm:invisible">
      <Button
        size="sm"
        variant="solid"
        aria-label={label}
        onClick={() => handleCreateNote()}
      >
        <PlusIcon aria-hidden={true} />
        <span className="hidden sm:block">Note</span>
      </Button>
    </Tooltip>
  );
};

export default HeaderNewNote;
