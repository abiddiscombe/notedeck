import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { serviceNote } from "../../database/serviceNote";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderNewNote } from "./HeaderNewNote";
import { HeaderThemeSwitch } from "./HeaderThemeSwitch";
import { Button } from "../../components/elements/Button";
import { Tooltip } from "../../components/elements/Tooltip";
import { Cog6ToothIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Settings } from "../Settings/Settings";
import { ModalDeleteAll } from "../Modal/ModalDeleteAll";

export function Header() {
    const notes = useLiveQuery(() => serviceNote.list());
    const [showSettings, setShowSettings] = useState(false);
    const [showDeleteAll, setShowDeleteAll] = useState(false);

    return (
        <>
            <Settings
                isOpen={showSettings}
                setIsOpen={setShowSettings}
            />
            <ModalDeleteAll
                isOpen={showDeleteAll}
                setIsOpen={setShowDeleteAll}
            />
            <header className="flex items-center gap-2 border-b border-b-primary-200 bg-white px-4 py-1.5 dark:border-b-primary-800 dark:bg-primary-900">
                <HeaderLogo />
                {!!notes?.length && (
                    <>
                        <HeaderNewNote />
                        <Tooltip label="Delete All Notes">
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setShowDeleteAll(true)}
                                className="bg-primary-50 dark:bg-primary-800"
                            >
                                <TrashIcon />
                            </Button>
                        </Tooltip>
                    </>
                )}
                <HeaderThemeSwitch />
                <Tooltip
                    label="Settings"
                    className="right-0"
                >
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowSettings(true)}
                        className="bg-primary-50 dark:bg-primary-800"
                    >
                        <Cog6ToothIcon />
                    </Button>
                </Tooltip>
            </header>
        </>
    );
}
