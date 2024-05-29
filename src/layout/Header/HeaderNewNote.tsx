import { serviceNote } from "../../database/serviceNote";
import { PlusIcon } from "@heroicons/react/16/solid";
import { Button } from "../../components/Button";
import { Tooltip } from "../../components/Tooltip";

export function HeaderNewNote() {
    const label = "New Note";

    function handleCreateNote() {
        serviceNote.create({
            theme: "yellow",
            content: "",
            isPriority: false,
            isMonospace: false,
        });
    }

    return (
        <Tooltip
            label={label}
            className="sm:invisible"
        >
            <Button
                size="sm"
                variant="solid"
                aria-label={label}
                onClick={() => handleCreateNote()}
            >
                <PlusIcon />
                <span className="hidden sm:block">{label}</span>
            </Button>
        </Tooltip>
    );
}
