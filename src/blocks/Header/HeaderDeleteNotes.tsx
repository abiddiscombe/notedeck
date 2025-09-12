import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
import { Toolset } from "@/components/ui/Toolset";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Typography } from "@/components/ui/Typography";
import notes from "@/database/notes";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function HeaderDeleteNotes() {
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
      <Dialog open={showModal}>
        <DialogPortal>
          <DialogOverlay onClick={() => setShowModal(false)} />
          <DialogContent>
            <DialogTitle>
              <Typography variant="h1">Confirm Notes Deletion</Typography>
            </DialogTitle>
            <Typography variant="body">
              Are you sure you want to delete <strong>all stored notes</strong>?
            </Typography>
            <Typography variant="body" className="mb-6">
              You won't be able to recover notes after they have been deleted
              from your device.
            </Typography>

            <form className="mt-2 mb-4 flex items-center gap-4">
              <Checkbox
                id="checkbox-delete-all-notes"
                checked={retainPriorityNotes}
                onCheckedChange={() =>
                  setRetainPriorityNotes(!retainPriorityNotes)
                }
              />
              <label
                htmlFor="checkbox-delete-all-notes"
                className="text-neutral-800 dark:text-neutral-200"
              >
                Retain notes marked as priority.
              </label>
            </form>
            <Toolset className="mt-8">
              <Button
                color="destructive"
                variant="primary"
                onClick={() => handleDeleteEverything()}
              >
                <Icon>
                  <TrashIcon />
                </Icon>
                Delete Notes
              </Button>
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
            </Toolset>
          </DialogContent>
        </DialogPortal>
      </Dialog>
      <Tooltip>
        <TooltipTrigger>
          <Button
            ratio="square"
            aria-label={label}
            onClick={() => setShowModal(true)}
          >
            <Icon>
              <TrashIcon />
            </Icon>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </>
  );
}
