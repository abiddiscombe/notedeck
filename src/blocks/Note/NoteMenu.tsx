import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { noteService } from "../../database/noteService";
import { MenuButton } from "../../components/MenuButton";
import { NoteItem, NoteModifyableFields } from "../../database/database";
import { noteThemes } from "../../utilities/noteThemes";
import { NoteMenuTheme } from "./NoteMenuTheme";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import {
    FlagIcon,
    TrashIcon,
    CodeBracketIcon,
    DocumentDuplicateIcon,
} from "@heroicons/react/16/solid";

type NoteMenuProps = {
    noteData: NoteItem;
    handleBringForwards: VoidFunction;
};

export function NoteMenu(p: NoteMenuProps) {
    function handleNoteDelete() {
        noteService.delete(p.noteData.id);
    }

    function handleNoteModify(updates: NoteModifyableFields) {
        noteService.modify(p.noteData.id, {
            ...p.noteData,
            ...updates,
        });
    }

    function handleNoteDuplicate() {
        noteService.create({
            theme: p.noteData.theme,
            content: p.noteData.content,
            isPriority: p.noteData.isPriority,
            isMonospace: p.noteData.isMonospace,
        });
    }

    const menuThemes = Object.keys(noteThemes);

    const menuOptions = [
        {
            icon: <CodeBracketIcon />,
            label: "Monospace",
            onClick: () =>
                handleNoteModify({
                    isMonospace: !p.noteData.isMonospace,
                }),
            isActive: p.noteData.isMonospace,
            isDestructive: false,
        },
        {
            icon: <FlagIcon />,
            label: "Priority",
            onClick: () =>
                handleNoteModify({
                    isPriority: !p.noteData.isPriority,
                }),
            isActive: p.noteData.isPriority,
            isDestructive: false,
        },
        {
            icon: <DocumentDuplicateIcon />,
            label: "Duplicate",
            onClick: () => handleNoteDuplicate(),
            isActive: false,
            isDestructive: false,
        },
        {
            icon: <TrashIcon />,
            label: "Delete",
            onClick: () => handleNoteDelete(),
            isActive: false,
            isDestructive: true,
        },
    ];

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button
                aria-label="Menu"
                onClick={p.handleBringForwards}
                className="rounded-tr px-4 py-2.5 hover:bg-gray-600/20 active:bg-gray-600/40 aria-expanded:bg-gray-600/20"
            >
                <EllipsisHorizontalIcon className="h-4" />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-75"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mr-2 mt-2 origin-top-right divide-y divide-gray-100 rounded bg-white shadow ring-1 ring-black/5 focus:outline-none">
                    <div className="flex flex-col px-1 py-1">
                        <Menu.Item as="div" className="flex gap-2 p-2">
                            {menuThemes.map((menuTheme) => (
                                <NoteMenuTheme
                                    key={menuTheme}
                                    onClick={() =>
                                        handleNoteModify({ theme: menuTheme })
                                    }
                                    themeId={menuTheme}
                                    themeIsActive={
                                        menuTheme === p.noteData.theme
                                    }
                                />
                            ))}
                        </Menu.Item>
                        <hr className="mb-1 border-gray-200" />
                        {menuOptions.map((menuOption) => (
                            <Menu.Item key={menuOption.label}>
                                <MenuButton
                                    icon={menuOption.icon}
                                    label={menuOption.label}
                                    onClick={menuOption.onClick}
                                    isActive={menuOption.isActive}
                                    isDestructive={menuOption.isDestructive}
                                />
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
