import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { noteService } from "../../database/noteService";
import { NoteItem, NoteModifyableFields } from "../../database/database";
import { noteThemes } from "../../utilities/noteThemes";
import { NoteMenuTheme } from "./NoteMenuTheme";
import { NoteMenuButton } from "./NoteMenuButton";
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

    const themes = Object.keys(noteThemes);

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button
                aria-label="Menu"
                onClick={p.handleBringForwards}
                className="px-4 py-2.5 hover:bg-gray-600/20 active:bg-gray-600/40"
            >
                <EllipsisHorizontalIcon className="h-4" />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mr-2 mt-2 origin-top-right divide-y divide-gray-100 rounded bg-white shadow ring-1 ring-black/5 focus:outline-none">
                    <div className="flex flex-col gap-1 px-1 py-1">
                        <Menu.Item as="div" className="flex gap-2 p-2">
                            {themes.map((theme) => (
                                <NoteMenuTheme
                                    key={theme}
                                    onClick={() =>
                                        handleNoteModify({ theme: theme })
                                    }
                                    themeId={theme}
                                    themeIsActive={theme === p.noteData.theme}
                                />
                            ))}
                        </Menu.Item>
                        <hr />
                        <Menu.Item>
                            <NoteMenuButton
                                onClick={() =>
                                    handleNoteModify({
                                        isMonospace: !p.noteData.isMonospace,
                                    })
                                }
                                icon={<CodeBracketIcon />}
                                label="Monospace"
                                isActive={p.noteData.isMonospace}
                            />
                        </Menu.Item>
                        <Menu.Item>
                            <NoteMenuButton
                                onClick={() =>
                                    handleNoteModify({
                                        isPriority: !p.noteData.isPriority,
                                    })
                                }
                                icon={<FlagIcon />}
                                label="Priority"
                                isActive={p.noteData.isPriority}
                            />
                        </Menu.Item>
                        <Menu.Item>
                            <NoteMenuButton
                                onClick={() => handleNoteDuplicate()}
                                icon={<DocumentDuplicateIcon />}
                                label="Duplicate"
                            />
                        </Menu.Item>
                        <Menu.Item>
                            <NoteMenuButton
                                onClick={() => handleNoteDelete()}
                                icon={<TrashIcon />}
                                label="Delete"
                                isDangerousAction={true}
                            />
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
