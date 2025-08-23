import Button from "@/components/Button";
import { NoteItem } from "@/database/db";
import notes, { NoteModifyableFields } from "@/database/notes";
import { themes } from "@/utilities/themes";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  CheckIcon,
  CodeBracketIcon,
  DocumentDuplicateIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
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
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        aria-label="Menu"
        onClick={p.handleBringForwards}
        className="rounded-tr px-4 py-2.5 hover:bg-neutral-600/20 active:bg-neutral-600/40
                    aria-expanded:bg-neutral-600/20 dark:hover:bg-neutral-800/40
                    dark:active:bg-neutral-900/40 dark:aria-expanded:bg-neutral-800/40"
      >
        <EllipsisHorizontalIcon className="h-4 text-neutral-900 dark:text-neutral-100" />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-75"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mr-2 mt-2 origin-top-right divide-y rounded bg-white shadow ring-1 ring-neutral-200 focus:outline-none dark:bg-neutral-900 dark:ring-neutral-800">
          <div className="flex flex-col p-1">
            <MenuItem as="div" className="flex gap-2 p-1 pb-2">
              {menuThemes.map((menuTheme) => (
                <NoteMenuTheme
                  key={menuTheme}
                  onClick={() => handleNoteModify({ theme: menuTheme })}
                  themeId={menuTheme}
                  themeIsActive={menuTheme === p.noteData.theme}
                />
              ))}
            </MenuItem>
            <hr className="mb-1 border-neutral-200 dark:border-neutral-500" />
            {menuItems.map((menuItem) => (
              <MenuItem key={menuItem.label}>
                <div>
                  <Button
                    size="sm"
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
                </div>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default NoteMenu;
