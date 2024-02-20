import { Button } from "../../components/Button";
import { PlusIcon } from "@heroicons/react/16/solid";
import { noteService } from "../../database/noteService";

export function HeaderAddNote() {
    function handleCreateNote() {
        noteService.create({
            theme: "yellow",
            content: "",
            isPriority: false,
            isMonospace: false,
        });
    }

    return (
        <Button variant="filled" onClick={() => handleCreateNote()}>
            <>
                <PlusIcon className="w-3.5" />
                Add Note
            </>
        </Button>
    );
}
