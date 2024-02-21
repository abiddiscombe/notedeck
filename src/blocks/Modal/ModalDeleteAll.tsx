import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { Typography } from "../../components/Typography";
import { noteService } from "../../database/noteService";

type ModalDeleteAllProps = {
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
};

export function ModalDeleteAll(p: ModalDeleteAllProps) {
    async function handleDeleteEverything() {
        const noteList = await noteService.list();
        noteList.forEach((note) => {
            noteService.delete(note.id);
        });
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
