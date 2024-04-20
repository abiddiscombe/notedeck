import { Fragment, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { serviceNote } from "../../database/serviceNote";
import { serviceSettings } from "../../database/serviceSettings";
import { appInfo } from "../../utilities/constants";
import { Menu, Transition } from "@headlessui/react";
import { ModalAbout } from "../Modal/ModalAbout";
import { ModalDeleteAll } from "../Modal/ModalDeleteAll";
import { ModalBackupRestore } from "../Modal/ModalBackupRestore";
import {
    CheckIcon,
    TrashIcon,
    InformationCircleIcon,
    EyeSlashIcon,
    ArrowsUpDownIcon,
    Bars3Icon,
} from "@heroicons/react/16/solid";
import { Button } from "../../components/elements/Button";

interface HeaderMenuProps {
    hasNotes: boolean;
}

export function HeaderMenu(p: HeaderMenuProps) {
    const settings = useLiveQuery(() => serviceSettings.read());
    const highestZIndex = useLiveQuery(() => serviceNote.getTopZIndex());
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showBackupRestoreModal, setShowBackupRestoreModal] = useState(false);

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
            icon: <ArrowsUpDownIcon />,
            label: "Backup & Restore",
            action: () => setShowBackupRestoreModal(true),
            isDisabled: false,
            isDestructive: false,
        },
        {
            icon: <EyeSlashIcon />,
            label: "Transparent Notes",
            action: () => toggleNoteTransparency(),
            isActive: !settings?.useOpaqueNotes,
            isDisabled: !p.hasNotes,
            isDestructive: false,
        },
        {
            icon: <TrashIcon />,
            label: "Delete All Notes",
            action: () => setShowDeleteModal(true),
            isDisabled: !p.hasNotes,
            isDestructive: true,
        },
    ];

    return (
        <>
            <ModalAbout
                isOpen={showAboutModal}
                setIsOpen={setShowAboutModal}
            />
            <ModalDeleteAll
                isOpen={showDeleteModal}
                setIsOpen={setShowDeleteModal}
            />
            <ModalBackupRestore
                isOpen={showBackupRestoreModal}
                setIsOpen={setShowBackupRestoreModal}
            />
            <Menu
                as="div"
                className="relative inline-block"
            >
                {({ open }) => (
                    <>
                        <Menu.Button as={Fragment}>
                            <Button
                                size="sm"
                                variant="ghost"
                                aria-label="Main Menu"
                                className={
                                    open
                                        ? "bg-primary-100 dark:bg-primary-700"
                                        : ""
                                }
                            >
                                <Bars3Icon />
                            </Button>
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
                                className="peer absolute right-0 mt-4 origin-top-right rounded bg-white shadow ring-1 ring-primary-200 dark:bg-primary-900 dark:ring-primary-800"
                            >
                                <div className="flex w-56 flex-col p-1">
                                    {menuItems.map((menuItem) => (
                                        <Menu.Item key={menuItem.label}>
                                            <Button
                                                variant="ghost"
                                                onClick={menuItem.action}
                                                disabled={menuItem.isDisabled}
                                                className={
                                                    menuItem.isDestructive
                                                        ? "text-red-600 dark:text-red-500"
                                                        : ""
                                                }
                                            >
                                                <>
                                                    {menuItem.icon}
                                                    <span className="mr-auto">
                                                        {menuItem.label}
                                                    </span>
                                                    {menuItem.isActive && (
                                                        <CheckIcon className="fill-green-600 dark:fill-green-500" />
                                                    )}
                                                </>
                                            </Button>
                                        </Menu.Item>
                                    ))}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>
        </>
    );
}
