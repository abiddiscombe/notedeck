import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { serviceNote } from "../../database/serviceNote";
import { serviceSettings } from "../../database/serviceSettings";
import { NoteItem } from "../../database/db";
import { NoteMenu } from "./NoteMenu";
import { themes } from "./themes";
import { NotePriority } from "./NotePriority";
import { useLiveQuery } from "dexie-react-hooks";

type NoteProps = {
    noteData: NoteItem;
};

export function Note(p: NoteProps) {
    const id = useId();
    const settings = useLiveQuery(() => serviceSettings.read());
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
        serviceNote.modify(p.noteData.id, notePosition);
    }, [notePosition, p.noteData.id]);

    if (!settings || !p.noteData) {
        return null;
    }

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
        const highestId = await serviceNote.getTopZIndex();
        if (highestId !== notePosition.posZ) {
            setNotePosition((prevState) => ({
                ...prevState,
                posZ: highestId + 1,
            }));
        }
    }

    const theme = themes[p.noteData.theme || "yellow"];

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
                    settings.useOpaqueNotes ? theme.noteOpaque : theme.note,
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
                <label
                    className="hidden"
                    htmlFor={textareaId}
                >
                    Note Content
                </label>
                <textarea
                    id={textareaId}
                    ref={textareaRef}
                    onChange={() =>
                        serviceNote.modify(p.noteData.id, {
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
                        "min-h-[2.6em] min-w-[16em] resize rounded-b bg-white/0 p-2 text-primary-800 dark:text-primary-100",
                        p.noteData.isMonospace && "font-mono text-sm",
                    )}
                />
            </article>
        </Draggable>
    );
}
