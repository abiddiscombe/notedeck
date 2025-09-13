import { Button } from "@/components/ui/Button";
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
              <Typography variant="h1">Confirm Notes Deletion</Typography>
            </DialogTitle>
            <Typography variant="body">
              Are you sure you wish to permanently delete all notes?
            </Typography>
            <Toolset className="mt-8">
              <Button
                color="destructive"
                variant="primary"
                onClick={() => handleDeleteAction()}
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
