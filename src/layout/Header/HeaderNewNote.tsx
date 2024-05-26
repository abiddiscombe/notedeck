import { serviceNote } from "../../database/serviceNote";
import { PlusIcon } from "@heroicons/react/16/solid";
import { Button } from "../../components/Button";

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
