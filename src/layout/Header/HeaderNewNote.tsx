import { serviceNote } from "../../database/serviceNote";
import { PlusIcon } from "@heroicons/react/16/solid";
import { Button } from "../../components/Button";
import { Tooltip } from "../../components/Tooltip";

export function HeaderNewNote() {
    function handleCreateNote() {
        serviceNote.create({
            theme: "yellow",
            content: "",
            isPriority: false,
            isMonospace: false,
        });
    }

    const label = "New Note";

    return (
        <Tooltip
            label={label}
            className="sm:invisible"
        >
            <Button
                size="sm"
                variant="solid"
                onClick={() => handleCreateNote()}
            >
                <PlusIcon />
                <span className="hidden sm:block">{label}</span>
            </Button>
        </Tooltip>
    );
}
