import { useEffect, useState } from "react";
import { Field, Label } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/16/solid";
import { notesService } from "../../database/notes.service";
import Dialog from "../../components/Dialog";
import Button from "../../components/Button";
import Tooltip from "../../components/Tooltip";
import Checkbox from "../../components/Checkbox";
import Typography from "../../components/Typography";

const HeaderDeleteNotes = () => {
    const [showModal, setShowModal] = useState(false);
    const [retainPriorityNotes, setRetainPriorityNotes] = useState(true);
    const label = "Delete All Notes";

    // // Revert the "Retain Priority Notes" checkbox to
    // // "checked" when the modal is re-opened.
    useEffect(() => {
        showModal && setRetainPriorityNotes(true);
    }, [showModal]);

    async function handleDeleteEverything() {
        await notesService.removeAll(!retainPriorityNotes);
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
                    Are you sure you want to delete{" "}
                    <strong>all stored notes</strong>?
                </Typography>
                <Typography
                    variant="body"
                    className="mb-6"
                >
                    You won't be able to recover notes after they have been
                    deleted from your device.
                </Typography>
                <Field className="mb-4 mt-2 flex items-center gap-4">
                    <Checkbox
                        state={retainPriorityNotes}
                        setState={() =>
                            setRetainPriorityNotes(!retainPriorityNotes)
                        }
                    />
                    <Label className="text-primary-800 dark:text-primary-200">
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
                        {`Delete ${!retainPriorityNotes ? "all " : ""}notes`}
                    </>
                </Button>
            </Dialog>
            <Tooltip label={label}>
                <Button
                    size="sm"
                    variant="ghost"
                    aria-label={label}
                    onClick={() => setShowModal(true)}
                    className="bg-primary-50 dark:bg-primary-800"
                >
                    <TrashIcon />
                </Button>
            </Tooltip>
        </>
    );
};

export default HeaderDeleteNotes;
