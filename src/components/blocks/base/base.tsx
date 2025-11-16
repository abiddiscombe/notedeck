import { Button } from "@/components/elements/button";
import { Icon } from "@/components/elements/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/elements/tooltip";
import * as services from "@/database/services";
import { useLiveQuery } from "dexie-react-hooks";
import { PlusIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Note } from "../note/note";

export const Base = () => {
  const notes = useLiveQuery(() => services.notes.getAll());
  const notesPresent = Boolean(notes?.length);

  const createFirstNote = () => {
    services.notes.createOne({
      theme: "yellow",
      content: "This is your first note! Click here to edit.",
      isMonospace: false,
    });
  };

  // return (
  //   <div className="dark:bg-base-900 space-y-2 bg-white p-8">
  //     <div className="flex gap-2">
  //       <Button
  //         icon={
  //           <Icon>
  //             <SaveIcon />
  //           </Icon>
  //         }
  //         color="base"
  //         variant="ghost"
  //       >
  //         Button
  //       </Button>
  //       <Button
  //         icon={
  //           <Icon>
  //             <SaveIcon />
  //           </Icon>
  //         }
  //         color="base"
  //         variant="solid"
  //       >
  //         Button
  //       </Button>
  //       <Button
  //         icon={
  //           <Icon>
  //             <SaveIcon />
  //           </Icon>
  //         }
  //         color="base"
  //         variant="outlined"
  //       >
  //         Button
  //       </Button>
  //     </div>
  //     <div className="flex gap-2">
  //       <Button
  //         icon={
  //           <Icon>
  //             <SaveIcon />
  //           </Icon>
  //         }
  //         color="destructive"
  //         variant="ghost"
  //       >
  //         Button
  //       </Button>
  //       <Button
  //         icon={
  //           <Icon>
  //             <SaveIcon />
  //           </Icon>
  //         }
  //         color="destructive"
  //         variant="solid"
  //       >
  //         Button
  //       </Button>
  //       <Button
  //         icon={
  //           <Icon>
  //             <SaveIcon />
  //           </Icon>
  //         }
  //         color="destructive"
  //         variant="outlined"
  //       >
  //         Button
  //       </Button>
  //     </div>
  //     <div className="flex gap-2">
  //       <Button
  //         disabled={true}
  //         icon={
  //           <Icon>
  //             <SaveIcon />
  //           </Icon>
  //         }
  //         color="destructive"
  //         variant="ghost"
  //       >
  //         Button
  //       </Button>
  //       <Button
  //         disabled={true}
  //         icon={
  //           <Icon>
  //             <SaveIcon />
  //           </Icon>
  //         }
  //         color="destructive"
  //         variant="solid"
  //       >
  //         Button
  //       </Button>
  //       <Button
  //         disabled={true}
  //         icon={
  //           <Icon>
  //             <SaveIcon />
  //           </Icon>
  //         }
  //         color="destructive"
  //         variant="outlined"
  //       >
  //         Button
  //       </Button>
  //     </div>
  //   </div>
  // );

  return (
    <main
      className={twMerge(
        "h-dvh p-2",
        notesPresent
          ? "relative overflow-auto p-2"
          : "grid grid-rows-[auto_1fr]",
      )}
    >
      <div className="px-4 py-3">
        <Tooltip>
          <TooltipTrigger>
            <h1
              id="logo"
              className="inline-block cursor-auto text-lg tracking-tight select-none"
            >
              NoteDeck
            </h1>
          </TooltipTrigger>
          <TooltipContent align="end" side="right">
            v{APP_VERSION}
          </TooltipContent>
        </Tooltip>
      </div>
      {notesPresent ? (
        notes?.map((note) => <Note key={note.id} noteData={note} />)
      ) : (
        <div className="grid place-items-center">
          <div className="flex max-w-2xl flex-col items-center pb-20">
            <h2 className="mb-6 text-5xl">Your Thoughts. Your Space.</h2>
            <p className="mb-6 max-w-md text-center">
              NoteDeck is a free sticky notes board that works offline. Your
              notes are saved in your browser and <strong>never</strong> leave
              your device.
            </p>
            <Button
              icon={
                <Icon>
                  <PlusIcon />
                </Icon>
              }
              variant="solid"
              onClick={() => createFirstNote()}
            >
              Create Note
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};
