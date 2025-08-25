import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NoteItem } from "@/database/db";
import notes, { NoteModifyableFields } from "@/database/notes";
import { themes } from "@/utilities/themes";
import {
  CheckIcon,
  CodeBracketIcon,
  DocumentDuplicateIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import NoteMenuTheme from "./NoteMenuTheme";

const NoteMenu = (
  p: React.HTMLAttributes<HTMLDivElement> & {
    noteData: NoteItem;
    handleBringForwards: VoidFunction;
  },
) => {
  function handleNoteDelete() {
    notes.remove(p.noteData.id);
  }

  function handleNoteModify(updates: NoteModifyableFields) {
    notes.modify(p.noteData.id, {
      ...p.noteData,
      ...updates,
    });
  }

  function handleNoteDuplicate() {
    // (Magic) Add X-20 and Y-120 pixels.
    const maxX = p.noteData.posX + p.noteData.posW + 20;
    const maxY = p.noteData.posY + p.noteData.posH + 120;
    const tooWide = window.innerWidth < maxX;
    const tooTall = window.innerHeight < maxY;

    notes.create({
      posX: p.noteData.posX + (tooWide ? -20 : 20),
      posY: p.noteData.posY + (tooTall ? -20 : 20),
      posW: p.noteData.posW,
      posH: p.noteData.posH,
      theme: p.noteData.theme,
      content: p.noteData.content,
      isPriority: p.noteData.isPriority,
      isMonospace: p.noteData.isMonospace,
    });
  }

  const menuThemes = Object.keys(themes);

  const menuItems = [
    {
      icon: <CodeBracketIcon />,
      label: "Monospace",
      action: () =>
        handleNoteModify({
          isMonospace: !p.noteData.isMonospace,
        }),
      isActive: p.noteData.isMonospace,
      isDestructive: false,
    },
    {
      icon: <StarIcon />,
      label: "Priority",
      action: () =>
        handleNoteModify({
          isPriority: !p.noteData.isPriority,
        }),
      isActive: p.noteData.isPriority,
      isDestructive: false,
    },
    {
      icon: <DocumentDuplicateIcon />,
      label: "Duplicate",
      action: () => handleNoteDuplicate(),
      isActive: false,
      isDestructive: false,
    },
    {
      icon: <TrashIcon />,
      label: "Delete",
      action: () => handleNoteDelete(),
      isActive: false,
      isDestructive: true,
    },
  ];

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="ghost"
          aria-label="Menu"
          onClick={p.handleBringForwards}
          className="rounded border-none enabled:hover:bg-neutral-600/20 enabled:hover:active:bg-neutral-600/40 aria-expanded:bg-neutral-600/20"
        >
          <EllipsisHorizontalIcon className="text-neutral-900 dark:text-neutral-100" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        alignOffset={6}
        sideOffset={6}
        className="flex flex-col p-1"
      >
        <div className="flex gap-2 p-1 pb-2">
          {menuThemes.map((menuTheme) => (
            <NoteMenuTheme
              key={menuTheme}
              onClick={() => handleNoteModify({ theme: menuTheme })}
              themeId={menuTheme}
              themeIsActive={menuTheme === p.noteData.theme}
            />
          ))}
        </div>
        <hr className="mb-1 border-neutral-200 dark:border-neutral-500" />
        {menuItems.map((menuItem) => (
          <Button
            variant="ghost"
            onClick={menuItem.action}
            className={
              menuItem.isDestructive
                ? "w-full text-red-600 dark:text-red-500"
                : "w-full"
            }
          >
            <>
              {menuItem.icon}
              <span className="mr-auto">{menuItem.label}</span>
              {menuItem.isActive && (
                <CheckIcon className="fill-green-600 dark:fill-green-500" />
              )}
            </>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default NoteMenu;
