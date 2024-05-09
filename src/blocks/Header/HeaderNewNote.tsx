import { serviceNote } from "../../database/serviceNote";
import { Button } from "../../components/elements/Button";
import { PlusIcon } from "@heroicons/react/16/solid";

export function HeaderNewNote() {
    function handleCreateNote() {
        serviceNote.create({
            theme: "yellow",
            content: "",
            isPriority: false,
            isMonospace: false,
        });
    }

    return (
        <Button
            size="sm"
            variant="solid"
            onClick={() => handleCreateNote()}
        >
            <>
                <PlusIcon />
                New Note
            </>
        </Button>
    );
}
