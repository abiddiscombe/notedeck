import { useEffect, useId, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import notes from "../../../database/notes";
import { NoteItem } from "../../../database/db";
import { themes } from "../../../utilities/themes";
import NoteMenu from "./NoteMenu";
import { StarIcon } from "@heroicons/react/16/solid";

const Note = (
  p: React.HTMLAttributes<HTMLElement> & {
    noteData: NoteItem;
    useOpaqueNotes?: boolean;
  },
) => {
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
    notes.modify(p.noteData.id, notePosition);
  }, [notePosition, p.noteData.id]);

  if (!p.noteData) {
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
    const highestId = await notes.getTopZIndex();
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
        className={twMerge(
          "absolute rounded shadow-sm hover:shadow-lg",
          p.useOpaqueNotes ? theme.noteOpaque : theme.note,
          !p.noteData.content &&
            !p.noteData.isPriority &&
            "[&:not(:hover)]:animate-pulse",
        )}
        style={{ zIndex: notePosition.posZ }}
      >
        <div className="flex items-stretch rounded-t">
          {p.noteData.isPriority && (
            <StarIcon className="my-auto ml-3 h-3.5 text-primary-900/80 dark:text-primary-100" />
          )}
          <div
            onMouseDown={() => handleBringForwards()}
            className="handle | grow cursor-grab px-2"
          />
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
            notes.modify(p.noteData.id, {
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
          className={twMerge(
            `min-h-[2.6em] min-w-[16em] resize rounded-b bg-white/0 p-2 text-primary-800
                        dark:text-primary-100`,
            p.noteData.isMonospace && "font-mono text-sm",
          )}
        />
      </article>
    </Draggable>
  );
};

export default Note;
