import { Button } from "../../components/Button";
import { PlusIcon } from "@heroicons/react/16/solid";
import { serviceNote } from "../../database/serviceNote";

export function HeaderAddNote() {
    function handleCreateNote() {
        serviceNote.create({
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
