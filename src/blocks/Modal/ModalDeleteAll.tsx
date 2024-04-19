import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/elements/Button";
import { Checkbox } from "../../components/elements/Checkbox";
import { Typography } from "../../components/elements/Typography";
import { serviceNote } from "../../database/serviceNote";
import { TrashIcon } from "@heroicons/react/16/solid";

type ModalDeleteAllProps = {
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
};

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
        <Modal
            title="Confirm Notes Deletion"
            isOpen={p.isOpen}
            setIsOpen={p.setIsOpen}
        >
            <Typography.Body>
                Are you sure you want to delete{" "}
                <strong>all stored notes</strong>?
            </Typography.Body>
            <Typography.Body>
                You won't be able to recover notes after they have been deleted
                from your device.
            </Typography.Body>
            <div className="mt-6">
                <Checkbox
                    state={retainPriorityNotes}
                    setState={setRetainPriorityNotes}
                    label={
                        <Typography.Body noMargin={true}>
                            Retain notes marked as priority.
                        </Typography.Body>
                    }
                />
            </div>
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
        </Modal>
    );
}
