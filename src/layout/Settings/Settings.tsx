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
                {appInfo.name} is a free and private space for your temporary
                sticky notes. Your data never leaves your device.
                <br className="mb-2" />
                <ExternalLink href={appInfo.infoUrl}>
                    More Information
                </ExternalLink>{" "}
                -{" "}
                <ExternalLink href={appInfo.sourceUrl}>
                    View Source
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
