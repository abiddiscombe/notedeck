import Dialog from "@/components/Dialog";
import Typography from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import notes from "@/database/notes";
import { Field, Label } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

const HeaderDeleteNotes = () => {
  const [showModal, setShowModal] = useState(false);
  const [retainPriorityNotes, setRetainPriorityNotes] = useState(true);
  const label = "Delete All Notes";

  // // Revert the "Retain Priority Notes" checkbox to
  // // "checked" when the modal is re-opened.
  useEffect(() => {
    if (showModal) {
      setRetainPriorityNotes(true);
    }
  }, [showModal]);

  async function handleDeleteEverything() {
    await notes.removeAll(!retainPriorityNotes);
    setShowModal(false);
  }

  return (
    <>
      <Dialog
        title="Confirm Notes Deletion"
        isOpen={showModal}
        setIsOpen={() => setShowModal(false)}
      >
        <Typography variant="body">
          Are you sure you want to delete <strong>all stored notes</strong>?
        </Typography>
        <Typography variant="body" className="mb-6">
          You won't be able to recover notes after they have been deleted from
          your device.
        </Typography>
        <Field className="mt-2 mb-4 flex items-center gap-4">
          <Checkbox
            checked={retainPriorityNotes}
            onCheckedChange={() => setRetainPriorityNotes(!retainPriorityNotes)}
          />
          <Label className="text-neutral-800 dark:text-neutral-200">
            Retain notes marked as priority.
          </Label>
        </Field>
        <Button
          variant="destructive"
          onClick={() => handleDeleteEverything()}
          className="mt-8"
        >
          <>
            <TrashIcon />
            Delete Notes
          </>
        </Button>
      </Dialog>
      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon"
            aria-label={label}
            onClick={() => setShowModal(true)}
          >
            <TrashIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </>
  );
};

export default HeaderDeleteNotes;
