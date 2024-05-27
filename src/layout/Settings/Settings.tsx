import { appInfo } from "../../utilities/constants";
import { Dialog } from "../../components/Dialog";
import { Typography } from "../../components/Typography";
import { ExternalLink } from "../../components/ExternalLink";
import { SettingsItems } from "./SettingsItems";
import { SettingsRestore } from "./SettingsRestore";

interface SettingsProps {
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
}

export function Settings(p: SettingsProps) {
    return (
        <Dialog
            isOpen={p.isOpen}
            setIsOpen={p.setIsOpen}
            title={`${appInfo.name} Settings`}
        >
            <Typography.Body>
                {appInfo.name} is a free and{" "}
                <ExternalLink href={appInfo.sourceUrl}>
                    open source
                </ExternalLink>{" "}
                app for recording your thoughts on virtual sticky notes. Your
                data never leaves your device and is persisted in your browser
                using{" "}
                <ExternalLink href="https://javascript.info/indexeddb">
                    IndexedDB
                </ExternalLink>
                .
            </Typography.Body>
            <hr className="my-6 dark:border-primary-600" />
            <SettingsItems />
            <hr className="mt-6 dark:border-primary-600" />
            <SettingsRestore />
        </Dialog>
    );
}
