import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { serviceNote } from "../../database/serviceNote";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";
import { Button } from "../../components/Button";
import { Tooltip } from "../../components/Tooltip";
import { Settings } from "../Settings/Settings";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderBackup } from "./HeaderBackup";
import { HeaderNewNote } from "./HeaderNewNote";
import { HeaderDeleteNotes } from "./HeaderDeleteNotes";
import { HeaderThemeSwitch } from "./HeaderThemeSwitch";
import { HeaderUpdateNotification } from "./HeaderUpdateNotification";

export function Header() {
    const notes = useLiveQuery(() => serviceNote.list());
    const [showSettings, setShowSettings] = useState(false);

    return (
        <>
            <Settings
                isOpen={showSettings}
                setIsOpen={setShowSettings}
            />
            <header className="flex items-center gap-2 border-b border-b-primary-200 bg-white px-4 py-1.5 dark:border-b-primary-800 dark:bg-primary-900">
                <HeaderLogo />
                <HeaderUpdateNotification />
                {!!notes?.length && (
                    <>
                        <HeaderNewNote />
                        <HeaderDeleteNotes />
                    </>
                )}
                <HeaderThemeSwitch />
                <HeaderBackup />
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
