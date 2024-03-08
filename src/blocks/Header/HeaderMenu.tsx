import { Fragment, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { serviceNote } from "../../database/serviceNote";
import { serviceSettings } from "../../database/serviceSettings";
import { MenuButton } from "../../components/MenuButton";
import { appInfo } from "../../utilities/constants";
import { Menu, Transition } from "@headlessui/react";
import { ModalAbout } from "../Modal/ModalAbout";
import { ModalDeleteAll } from "../Modal/ModalDeleteAll";
import { Bars3Icon } from "@heroicons/react/24/solid";
import {
    TrashIcon,
    InformationCircleIcon,
    ArrowTopRightOnSquareIcon,
    EyeSlashIcon,
} from "@heroicons/react/16/solid";

type HeaderMenuProps = {
    userHasNotes: boolean;
};

export function HeaderMenu(p: HeaderMenuProps) {
    const settings = useLiveQuery(() => serviceSettings.read());
    const highestZIndex = useLiveQuery(() => serviceNote.getTopZIndex());
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function openSourceNewTab() {
        const win = window.open(appInfo.source, "_blank");
        win?.focus();
    }

    function toggleNoteTransparency() {
        serviceSettings.write({
            useOpaqueNotes: !settings.useOpaqueNotes,
        });
    }

    const menuItems = [
        {
            icon: <InformationCircleIcon />,
            label: "About " + appInfo.name,
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
            icon: <EyeSlashIcon />,
            label: "Transparent Notes",
            action: () => toggleNoteTransparency(),
            isActive: !settings?.useOpaqueNotes,
            isDisabled: p.userHasNotes,
            isDestructive: false,
        },
        {
            icon: <TrashIcon />,
            label: "Delete All Notes",
            action: () => setShowDeleteModal(true),
            isDisabled: p.userHasNotes,
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
                        <div className="flex w-56 flex-col p-1">
                            {menuItems.map((menuItem) => (
                                <Menu.Item key={menuItem.label}>
                                    <MenuButton
                                        icon={menuItem.icon}
                                        label={menuItem.label}
                                        onClick={menuItem.action}
                                        isActive={menuItem.isActive}
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
