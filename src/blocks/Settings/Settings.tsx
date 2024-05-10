import { appInfo } from "../../utilities/constants";
import { Dialog } from "../../components/Dialog";
import { TabGroup } from "../../components/TabGroup";
import { SettingsAbout } from "./SettingsAbout";
import { SettingsApperance } from "./SettingsAppearance";
import { SettingsBackupRestore } from "./SettingsBackupRestore";

interface SettingsProps {
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
}

export function Settings(p: SettingsProps) {
    const tabs = [
        {
            label: "About",
            content: <SettingsAbout />,
        },
        {
            label: "Appearance",
            content: <SettingsApperance />,
        },
        {
            label: "Backup & Restore",
            content: <SettingsBackupRestore />,
        },
    ];

    return (
        <Dialog
            size="lg"
            isOpen={p.isOpen}
            setIsOpen={p.setIsOpen}
            title={`${appInfo.name} Settings`}
        >
            <TabGroup
                items={tabs}
                className="[&>*:nth-child(2)]:h-[26em] [&>*:nth-child(2)]:overflow-y-scroll"
            />
        </Dialog>
    );
}
