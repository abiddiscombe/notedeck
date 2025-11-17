import { type NoteItem } from "@/database/models";
import * as services from "@/database/services";
import { themes } from "@/utilities/themes";
import { useEffect, useId, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { twMerge } from "tailwind-merge";
import { NoteMenu } from "./note-menu";

export const Note = (
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
    services.notes.updateOne(p.noteData.id, notePosition);
  }, [notePosition, p.noteData.id]);

  if (!p.noteData) {
    return null;
  }

  const handleDragEvent = (_: DraggableEvent, data: DraggableData) => {
    setNotePosition((prevState) => ({
      ...prevState,
      posX: prevState.posX + data.deltaX,
      posY: prevState.posY + data.deltaY,
    }));
  };

  const handleResizeEvent = () => {
    const textareaSize = textareaRef.current?.getBoundingClientRect();
    if (textareaSize?.width && textareaSize?.height) {
      setNotePosition((prevState) => ({
        ...prevState,
        posW: textareaSize.width,
        posH: textareaSize.height,
      }));
    }
  };

  const handleBringForwards = async () => {
    const highestId = await services.notes.getTopZIndex();
    if (highestId !== notePosition.posZ) {
      setNotePosition((prevState) => ({
        ...prevState,
        posZ: highestId + 1,
      }));
    }
  };

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
          "absolute rounded shadow-sm",
          p.useOpaqueNotes ? theme.noteOpaque : theme.note,
          !p.noteData.content && "[&:not(:hover)]:animate-pulse",
        )}
        style={{ zIndex: notePosition.posZ }}
      >
        <div className="flex items-stretch rounded-t">
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
            services.notes.updateOne(p.noteData.id, {
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
            `text-base-950 dark:text-base-100 min-h-[2.6em] min-w-[16em] resize rounded-b bg-white/0 p-2 font-medium!`,
            p.noteData.isMonospace && "font-mono! text-sm!",
          )}
        />
      </article>
    </Draggable>
  );
};
