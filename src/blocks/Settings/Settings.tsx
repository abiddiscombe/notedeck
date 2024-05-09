import { appInfo } from "../../utilities/constants";
import { Modal } from "../../components/Modal";
import { TabGroup } from "../../components/elements/TabGroup";
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
        <Modal
            size="lg"
            isOpen={p.isOpen}
            setIsOpen={p.setIsOpen}
            title={`${appInfo.name} Settings`}
        >
            <div className="h-[28em] overflow-y-scroll">
                <TabGroup items={tabs} />
            </div>
        </Modal>
    );
}
