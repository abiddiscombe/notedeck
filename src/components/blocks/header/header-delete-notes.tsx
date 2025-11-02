import { Button } from "@/components/elements/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/elements/dialog";
import { Icon } from "@/components/elements/icon";
import { Toolset } from "@/components/elements/toolset";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/elements/tooltip";
import notes from "@/database/notes";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

export function HeaderDeleteNotes() {
  const [showModal, setShowModal] = useState(false);
  const label = "Delete All Notes";

  async function handleDeleteAction() {
    await notes.removeAll();
    setShowModal(false);
  }

  return (
    <>
      <Dialog open={showModal}>
        <DialogPortal>
          <DialogOverlay onClick={() => setShowModal(false)} />
          <DialogContent>
            <DialogTitle>
              <h2>Confirm Notes Deletion</h2>
            </DialogTitle>
            <p>Are you sure you wish to permanently delete all notes?</p>
            <Toolset className="mt-8">
              <Button
                icon={
                  <Icon>
                    <TrashIcon />
                  </Icon>
                }
                variant="destructive"
                onClick={() => handleDeleteAction()}
              >
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
            icon={
              <Icon>
                <TrashIcon />
              </Icon>
            }
            aria-label={label}
            onClick={() => setShowModal(true)}
          />
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </>
  );
}
