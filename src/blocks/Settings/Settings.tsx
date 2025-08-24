import Typography from "@/components/Typography";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "@/components/ui/link";
import { Toolset, ToolsetSpacer } from "@/components/ui/toolset";
import { APP_INFO } from "@/utilities/constants";
import SettingsItems from "./SettingsItems";
import SettingsRestore from "./SettingsRestore";

const Settings = (p: {
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
}) => {
  return (
    <Dialog open={p.isOpen}>
      <DialogPortal>
        <DialogOverlay onClick={() => p.setIsOpen(false)} />
        <DialogContent>
          <DialogTitle>
            <Typography variant="h2">Settings</Typography>
          </DialogTitle>
          <Typography variant="body">
            {APP_INFO.Name} is a free and private sticky notes board that works
            offline. Your notes are persisted in the browser and never leave
            your device.
          </Typography>
          <hr className="my-6 border-neutral-200 dark:border-neutral-600" />
          <SettingsItems />
          <hr className="mt-6 border-neutral-200 dark:border-neutral-600" />
          <SettingsRestore />
          <hr className="mt-6 border-neutral-200 dark:border-neutral-600" />
          <Toolset className="mt-6">
            <Button onClick={() => p.setIsOpen(false)}>Close</Button>
            <ToolsetSpacer />
            <Typography variant="body" className="text-sm">
              <Link href={APP_INFO.GitHubRepoUrl} target="_blank">
                {APP_INFO.Name} v{APP_INFO.SemVer}
              </Link>
            </Typography>
          </Toolset>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default Settings;
