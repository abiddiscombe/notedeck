import { APP_INFO } from "../../utilities/constants";
import Dialog from "../../components/Dialog";
import Typography from "../../components/Typography";
import ExternalLink from "../../components/ExternalLink";
import SettingsItems from "./SettingsItems";
import SettingsRestore from "./SettingsRestore";
import SettingsVersion from "./SettingsVersion";

const Settings = (p: {
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
}) => {
  return (
    <Dialog isOpen={p.isOpen} setIsOpen={p.setIsOpen} title="Settings">
      <Typography variant="body">
        {APP_INFO.Name} is a free and private sticky notes board that works
        offline. Your notes are persisted in the browser and never leave your
        device. <ExternalLink href={APP_INFO.InfoUrl}>Learn more.</ExternalLink>
      </Typography>
      <hr className="my-6 dark:border-primary-600" />
      <SettingsItems />
      <hr className="mt-6 dark:border-primary-600" />
      <SettingsRestore />
      <hr className="mt-6 dark:border-primary-600" />
      <SettingsVersion />
    </Dialog>
  );
};

export default Settings;
