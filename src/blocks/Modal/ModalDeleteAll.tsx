import { useEffect, useState } from "react";
import { Dialog } from "../../components/Dialog";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Typography } from "../../components/Typography";
import { serviceNote } from "../../database/serviceNote";
import { TrashIcon } from "@heroicons/react/16/solid";
import { Item } from "../Settings/Item";

interface ModalDeleteAllProps {
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
}

export function ModalDeleteAll(p: ModalDeleteAllProps) {
    const [retainPriorityNotes, setRetainPriorityNotes] = useState(true);

    // Revert the "Retain Priority Notes" checkbox to
    // "checked" when the modal is re-opened.
    useEffect(() => {
        p.isOpen && setRetainPriorityNotes(true);
    }, [p.isOpen]);

    async function handleDeleteEverything() {
        await serviceNote.deleteAll(!retainPriorityNotes);
        p.setIsOpen(false);
    }

    return (
        <Dialog
            title="Confirm Notes Deletion"
            isOpen={p.isOpen}
            setIsOpen={p.setIsOpen}
        >
            <Typography.Body>
                Are you sure you want to delete{" "}
                <strong>all stored notes</strong>?
            </Typography.Body>
            <Typography.Body className="mb-6">
                You won't be able to recover notes after they have been deleted
                from your device.
            </Typography.Body>
            <Item label="Retain notes marked as priority">
                <Checkbox
                    state={retainPriorityNotes}
                    setState={() =>
                        setRetainPriorityNotes(!retainPriorityNotes)
                    }
                />
            </Item>
            <div className="mt-8 flex items-center gap-4">
                <Button
                    variant="destructive"
                    onClick={() => handleDeleteEverything()}
                >
                    <>
                        <TrashIcon />
                        {`Delete ${!retainPriorityNotes ? "all " : ""}notes`}
                    </>
                </Button>
            </div>
        </Dialog>
    );
}
