import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Typography } from "../../components/Typography";
import { serviceNote } from "../../database/serviceNote";

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
            title={<Typography variant="h2">Confirm Notes Deletion</Typography>}
            isOpen={p.isOpen}
            setIsOpen={p.setIsOpen}
        >
            <Typography variant="body">
                Are you sure you want to delete{" "}
                <strong>all stored notes</strong>?
            </Typography>
            <Typography variant="body">
                You won't be able to recover notes after they have been deleted
                from your device.
            </Typography>
            <div className="mt-6">
                <Checkbox
                    state={retainPriorityNotes}
                    setState={setRetainPriorityNotes}
                    label={
                        <Typography variant="bodyNoMargin">
                            Retain notes marked as priority?
                        </Typography>
                    }
                />
            </div>
            <div className="mt-8 flex items-center gap-4">
                <Button
                    variant="destructive"
                    onClick={() => handleDeleteEverything()}
                >
                    Delete Notes
                </Button>
                <Button variant="outlined" onClick={() => p.setIsOpen(false)}>
                    Cancel
                </Button>
            </div>
        </Modal>
    );
}
