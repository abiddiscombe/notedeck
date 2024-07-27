import { APP_INFO } from "../../utilities/constants";
import Dialog from "../../components/Dialog";
import Typography from "../../components/Typography";
import ExternalLink from "../../components/ExternalLink";
import SettingsItems from "./SettingsItems";
import SettingsRestore from "./SettingsRestore";

const Settings = (p: {
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
}) => {
    return (
        <Dialog
            isOpen={p.isOpen}
            setIsOpen={p.setIsOpen}
            title="Settings"
        >
            <Typography variant="body">
                {APP_INFO.Name} is a free and open-source alternative to paper
                notes that respects your privacy and works offline. Your data
                belongs to you and never leaves your device.
                <br className="mb-2" />
                <ExternalLink href={APP_INFO.InfoUrl}>
                    More Information
                </ExternalLink>{" "}
                -{" "}
                <ExternalLink href={APP_INFO.SourceUrl}>
                    View Source
                </ExternalLink>
                .
            </Typography>
            <hr className="my-6 dark:border-primary-600" />
            <SettingsItems />
            <hr className="mt-6 dark:border-primary-600" />
            <SettingsRestore />
        </Dialog>
    );
};

export default Settings;
