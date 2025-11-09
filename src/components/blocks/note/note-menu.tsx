import { Button } from "@/components/elements/button";
import { Icon } from "@/components/elements/icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/elements/popover";
import { type ModifiableNoteItem, type NoteItem } from "@/database/models";
import * as services from "@/database/services";
import { themes } from "@/utilities/themes";
import {
  CheckIcon,
  CodeIcon,
  CopyIcon,
  EllipsisIcon,
  TrashIcon,
} from "lucide-react";
import { NoteMenuTheme } from "./note-menu-theme";

export const NoteMenu = (
  p: React.HTMLAttributes<HTMLDivElement> & {
    noteData: NoteItem;
    handleBringForwards: VoidFunction;
  },
) => {
  const handleNoteDelete = () => {
    services.notes.deleteOne(p.noteData.id);
  };

  const handleNoteModify = (updates: ModifiableNoteItem) => {
    services.notes.updateOne(p.noteData.id, {
      ...p.noteData,
      ...updates,
    });
  };

  const handleNoteDuplicate = () => {
    // (Magic) Add X-20 and Y-120 pixels.
    const maxX = p.noteData.posX + p.noteData.posW + 20;
    const maxY = p.noteData.posY + p.noteData.posH + 120;
    const tooWide = window.innerWidth < maxX;
    const tooTall = window.innerHeight < maxY;

    services.notes.createOne({
      posX: p.noteData.posX + (tooWide ? -20 : 20),
      posY: p.noteData.posY + (tooTall ? -20 : 20),
      posW: p.noteData.posW,
      posH: p.noteData.posH,
      theme: p.noteData.theme,
      content: p.noteData.content,
      isMonospace: p.noteData.isMonospace,
    });
  };

  const menuThemes = Object.keys(themes);

  const menuItems = [
    {
      icon: <CodeIcon />,
      label: "Monospace",
      action: () =>
        handleNoteModify({
          isMonospace: !p.noteData.isMonospace,
        }),
      isActive: p.noteData.isMonospace,
      isDestructive: false,
    },
    {
      icon: <CopyIcon />,
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
          icon={
            <Icon>
              <EllipsisIcon />
            </Icon>
          }
          variant="ghost"
          aria-label="Menu"
          onClick={p.handleBringForwards}
          className="hover:bg-base-600/20! active:bg-base-600/40! aria-expanded:bg-base-600/20! rounded-none rounded-tr border-none"
        />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        alignOffset={6}
        sideOffset={6}
        className="flex flex-col gap-1 p-1"
      >
        <div className="flex gap-2 p-1">
          {menuThemes.map((menuTheme) => (
            <NoteMenuTheme
              key={menuTheme}
              onClick={() => handleNoteModify({ theme: menuTheme })}
              themeId={menuTheme}
              themeIsActive={menuTheme === p.noteData.theme}
            />
          ))}
        </div>
        <hr className="border-base-200 dark:border-base-500" />
        {menuItems.map((menuItem) => (
          <Button
            key={menuItem.label}
            icon={<Icon>{menuItem.icon}</Icon>}
            variant="ghost"
            onClick={menuItem.action}
          >
            <>
              <span className="mr-auto">{menuItem.label}</span>
              {menuItem.isActive && (
                <Icon>
                  <CheckIcon className="text-accent-700 dark:text-accent-500" />
                </Icon>
              )}
            </>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
