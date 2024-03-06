import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { noteService } from "../../database/noteService";
import { NoteItem } from "../../database/database";
import { NoteMenu } from "./NoteMenu";
import { noteThemes } from "../../utilities/noteThemes";
import { NotePriority } from "./NotePriority";

type NoteProps = {
    noteData: NoteItem;
};

export function Note(p: NoteProps) {
    const id = useId();
    const textareaId = useId();
    const nodeRef = useRef<HTMLElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [notePosition, setNotePosition] = useState({
        posX: p.noteData.posX,
        posY: p.noteData.posY,
        posZ: p.noteData.posZ,
        posW: p.noteData.posW,
        posH: p.noteData.posH,
    });

    useEffect(() => {
        noteService.modify(p.noteData.id, notePosition);
    }, [notePosition]);

    function handleDragEvent(_: DraggableEvent, data: DraggableData) {
        setNotePosition((prevState) => ({
            ...prevState,
            posX: prevState.posX + data.deltaX,
            posY: prevState.posY + data.deltaY,
        }));
    }

    function handleResizeEvent() {
        const textareaSize = textareaRef.current?.getBoundingClientRect();
        if (textareaSize?.width && textareaSize?.height) {
            setNotePosition((prevState) => ({
                ...prevState,
                posW: textareaSize.width,
                posH: textareaSize.height,
            }));
        }
    }

    async function handleBringForwards() {
        const highestId = await noteService.getTopZIndex();
        if (highestId !== notePosition.posZ) {
            setNotePosition((prevState) => ({
                ...prevState,
                posZ: highestId + 1,
            }));
        }
    }

    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            handle=".handle"
            onDrag={handleDragEvent}
            position={{
                x: notePosition.posX,
                y: notePosition.posY,
            }}
        >
            <article
                id={id}
                ref={nodeRef}
                className={clsx(
                    "absolute rounded shadow-sm hover:shadow",
                    noteThemes[p.noteData.theme || "yellow"].note,
                    !p.noteData.content &&
                        !p.noteData.isPriority &&
                        "[&:not(:hover)]:animate-pulse",
                )}
                style={{ zIndex: notePosition.posZ }}
            >
                <div className={clsx("flex items-stretch rounded-t")}>
                    <div
                        onMouseDown={() => handleBringForwards()}
                        className="handle | grow cursor-grab px-2"
                    />
                    {p.noteData.isPriority && <NotePriority />}
                    <NoteMenu
                        handleBringForwards={handleBringForwards}
                        noteData={p.noteData}
                    />
                </div>
                <label className="hidden" htmlFor={textareaId}>
                    Note Content
                </label>
                <textarea
                    id={textareaId}
                    ref={textareaRef}
                    onChange={() =>
                        noteService.modify(p.noteData.id, {
                            content: textareaRef.current?.value,
                        })
                    }
                    onClick={() => handleBringForwards()}
                    onMouseUp={() => handleResizeEvent()}
                    placeholder="Click here to edit this note."
                    defaultValue={p.noteData.content}
                    style={{
                        width: notePosition.posW,
                        height: notePosition.posH,
                    }}
                    className={clsx(
                        "min-h-[14.5em] min-w-[17em] resize rounded-b bg-white/0 p-2",
                        p.noteData.isMonospace && "font-mono text-sm",
                    )}
                />
            </article>
        </Draggable>
    );
}
