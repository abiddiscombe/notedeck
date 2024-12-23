import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import notes, { NoteModifyableFields } from "../../../database/notes";
import { NoteItem } from "../../../database/db";
import { themes } from "../../../utilities/themes";
import NoteMenuTheme from "./NoteMenuTheme";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import {
  StarIcon,
  TrashIcon,
  CodeBracketIcon,
  DocumentDuplicateIcon,
  CheckIcon,
} from "@heroicons/react/16/solid";
import Button from "../../../components/Button";

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
        className="rounded-tr px-4 py-2.5 hover:bg-primary-600/20 active:bg-primary-600/40
                    aria-expanded:bg-primary-600/20 dark:hover:bg-primary-800/40
                    dark:active:bg-primary-900/40 dark:aria-expanded:bg-primary-800/40"
      >
        <EllipsisHorizontalIcon className="h-4 text-primary-900 dark:text-primary-100" />
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
        <MenuItems className="absolute right-0 mr-2 mt-2 origin-top-right divide-y rounded bg-white shadow ring-1 ring-primary-200 focus:outline-none dark:bg-primary-900 dark:ring-primary-800">
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
            <hr className="mb-1 border-primary-200 dark:border-primary-500" />
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
