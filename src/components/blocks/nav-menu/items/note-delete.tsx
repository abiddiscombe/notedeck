import { Button } from "@/components/elements/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/elements/dialog";
import { Icon } from "@/components/elements/icon";
import { Toolset } from "@/components/elements/toolset";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/elements/tooltip";
import * as services from "@/database/services";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

export const NoteDelete = () => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteNotes = async () => {
    await services.notes.deleteAll();
    setShowModal(false);
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <Button
            icon={
              <Icon>
                <TrashIcon />
              </Icon>
            }
            variant="ghost"
            aria-label="Delete All Notes"
            className="rounded-full"
            onClick={() => setShowModal(true)}
          />
        </TooltipTrigger>
        <TooltipContent align="end">Delete All Notes</TooltipContent>
      </Tooltip>
      <Dialog open={showModal}>
        <DialogOverlay onClick={() => setShowModal(false)} />
        <DialogContent align="center" title="Confirm Notes Deletion">
          <h2 className="mb-4 text-lg">Confirm Notes Deletion</h2>
          <p>
            Are you sure you wish to permanently delete all your notes? This
            action cannot be undone.
          </p>
          <Toolset className="mt-8">
            <Button
              icon={
                <Icon>
                  <TrashIcon />
                </Icon>
              }
              variant="destructive"
              onClick={() => handleDeleteNotes()}
            >
              Delete Notes
            </Button>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
          </Toolset>
        </DialogContent>
      </Dialog>
    </>
  );
};
