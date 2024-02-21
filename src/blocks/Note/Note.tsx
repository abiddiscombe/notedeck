import { useId, useRef, useState } from "react";
import clsx from "clsx";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { noteService } from "../../database/noteService";
import { NoteItem, NoteModifyableFields } from "../../database/database";
import { noteThemes } from "../../utilities/noteThemes";
import { NoteMenu } from "./NoteMenu";
import { NotePriority } from "./NotePriority";

type NoteProps = {
    noteData: NoteItem;
};

export function Note(p: NoteProps) {
    const id = useId();
    const nodeRef = useRef<HTMLElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [deltaPos, setDeltaPos] = useState({
        x: p.noteData.positionX,
        y: p.noteData.positionY,
    });

    function handleNoteModify(changes: NoteModifyableFields) {
        noteService.modify(p.noteData.id, {
            ...p.noteData,
            ...changes,
        });
    }

    async function handleBringForwards() {
        const highestId = await noteService.getTopZIndex();
        if (highestId === p.noteData.positionZ) {
            // Do nothing if already the highest
            // onscreen element.
            return;
        }

        handleNoteModify({
            positionZ: highestId + 1,
        });
    }

    function handleDrag(_: DraggableEvent, data: DraggableData) {
        const { x, y } = deltaPos;
        setDeltaPos({
            x: x + data.deltaX,
            y: y + data.deltaY,
        });
    }

    function handleDragStop() {
        handleNoteModify({
            positionX: deltaPos.x,
            positionY: deltaPos.y,
        });
    }

    const theme = noteThemes[p.noteData.theme] || noteThemes.yellow;

    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            handle=".handle"
            position={deltaPos}
            onDrag={handleDrag}
            onStop={handleDragStop}
        >
            <article
                id={id}
                ref={nodeRef}
                className={clsx(
                    "absolute w-[26rem] overflow-hidden rounded shadow-sm hover:shadow",
                    theme.note,
                    !p.noteData.content && "[&:not(:hover)]:animate-pulse",
                )}
                style={{ zIndex: `${p.noteData.positionZ}` }}
            >
                <div className={clsx("flex items-stretch")}>
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
                <section
                    onMouseDown={() => handleBringForwards()}
                    className={clsx("flex p-1")}
                >
                    <textarea
                        rows={8}
                        ref={textareaRef}
                        onChange={() =>
                            handleNoteModify({
                                content: textareaRef.current?.value,
                            })
                        }
                        placeholder="Click here to edit this note."
                        defaultValue={p.noteData.content}
                        className={clsx(
                            "grow resize-none rounded-b bg-white/0 p-2",
                            p.noteData.isMonospace && "font-mono text-sm",
                        )}
                    />
                </section>
            </article>
        </Draggable>
    );
}
