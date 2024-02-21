import { Fragment, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { noteService } from "../../database/noteService";
import { appName, appSource } from "../../utilities/constants";
import { Menu, Transition } from "@headlessui/react";
import { ModalAbout } from "../Modal/ModalAbout";
import { ModalDeleteAll } from "../Modal/ModalDeleteAll";
import { Bars3Icon } from "@heroicons/react/24/solid";
import {
    TrashIcon,
    InformationCircleIcon,
    ArrowTopRightOnSquareIcon,
} from "@heroicons/react/16/solid";

type HeaderMenuProps = {
    canDeleteNotes: boolean;
};

export function HeaderMenu(p: HeaderMenuProps) {
    const highestZIndex = useLiveQuery(() => noteService.getTopZIndex());
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function openSourceNewTab() {
        const win = window.open(appSource, "_blank");
        win?.focus();
    }

    const menuItems = [
        {
            id: "deleteEverything",
            icon: (
                <TrashIcon className="h-3.5 text-gray-500 group-disabled:text-gray-300" />
            ),
            label: "Delete All Notes",
            action: () => setShowDeleteModal(true),
            disabled: p.canDeleteNotes,
        },
        {
            id: "viewInformation",
            icon: <InformationCircleIcon className="h-3.5 text-gray-500" />,
            label: "About " + appName,
            action: () => setShowAboutModal(true),
            disabled: false,
        },
        {
            id: "viewSourceGitHub",
            icon: <ArrowTopRightOnSquareIcon className="h-3.5 text-gray-500" />,
            label: "View Source",
            action: () => openSourceNewTab(),
            disabled: false,
        },
    ];

    return (
        <>
            <ModalAbout isOpen={showAboutModal} setIsOpen={setShowAboutModal} />
            <ModalDeleteAll
                isOpen={showDeleteModal}
                setIsOpen={setShowDeleteModal}
            />
            <Menu as="div" className="relative inline-block">
                <Menu.Button
                    aria-label="Menu"
                    className="rounded border border-white px-3 py-2 hover:border-gray-200 hover:bg-gray-100 active:border-gray-300 active:bg-gray-200"
                >
                    <Bars3Icon className="h-4" />
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
                    <Menu.Items
                        style={{ zIndex: highestZIndex + 1 }}
                        className="absolute right-0 mt-4 origin-top-right rounded bg-white shadow ring-1 ring-black/5"
                    >
                        <div className="flex w-48 flex-col gap-1 p-1">
                            {menuItems.map((menuItem) => (
                                <Menu.Item key={menuItem.id}>
                                    <button
                                        disabled={menuItem.disabled}
                                        onClick={() => menuItem.action()}
                                        className="group flex items-center gap-3 rounded px-4 py-1.5 enabled:hover:bg-gray-100 enabled:active:bg-gray-200"
                                    >
                                        {menuItem.icon}
                                        <span className="text-sm group-disabled:text-gray-400">
                                            {menuItem.label}
                                        </span>
                                    </button>
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    );
}
