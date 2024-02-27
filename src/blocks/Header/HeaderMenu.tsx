import { Fragment, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { noteService } from "../../database/noteService";
import { MenuButton } from "../../components/MenuButton";
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
            icon: <InformationCircleIcon />,
            label: "About " + appName,
            action: () => setShowAboutModal(true),
            isDisabled: false,
            isDestructive: false,
        },
        {
            icon: <ArrowTopRightOnSquareIcon />,
            label: "View Source",
            action: () => openSourceNewTab(),
            isDisabled: false,
            isDestructive: false,
        },
        {
            icon: <TrashIcon />,
            label: "Delete All Notes",
            action: () => setShowDeleteModal(true),
            isDisabled: p.canDeleteNotes,
            isDestructive: true,
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
                    className="rounded border border-white px-3 py-2 hover:border-gray-200 hover:bg-gray-100 active:border-gray-300 active:bg-gray-200 aria-expanded:border-gray-200 aria-expanded:bg-gray-100"
                >
                    <Bars3Icon className="h-4" />
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
                    <Menu.Items
                        style={{ zIndex: highestZIndex + 1 }}
                        className="absolute right-0 mt-4 origin-top-right rounded bg-white shadow ring-1 ring-black/5"
                    >
                        <div className="flex w-48 flex-col p-1">
                            {menuItems.map((menuItem) => (
                                <Menu.Item key={menuItem.label}>
                                    <MenuButton
                                        icon={menuItem.icon}
                                        label={menuItem.label}
                                        onClick={menuItem.action}
                                        isActive={false}
                                        isDisabled={menuItem.isDisabled}
                                        isDestructive={menuItem.isDestructive}
                                    />
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    );
}
