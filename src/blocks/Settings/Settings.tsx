import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Link } from "@/components/ui/Link";
import { Toolset, ToolsetSpacer } from "@/components/ui/Toolset";
import { APP_INFO } from "@/utilities/constants";
import { SettingsItems } from "./SettingsItems";
import { SettingsRestore } from "./SettingsRestore";

export function Settings(p: {
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
}) {
  return (
    <Dialog open={p.isOpen}>
      <DialogPortal>
        <DialogOverlay onClick={() => p.setIsOpen(false)} />
        <DialogContent>
          <DialogTitle>
            <h2>Settings</h2>
          </DialogTitle>
          <p>
            {APP_INFO.Name} is a free and private sticky notes board that works
            offline. Your notes are persisted in the browser and never leave
            your device.
          </p>
          <hr className="my-6 border-neutral-200 dark:border-neutral-600" />
          <SettingsItems />
          <hr className="mt-6 border-neutral-200 dark:border-neutral-600" />
          <SettingsRestore />
          <hr className="mt-6 border-neutral-200 dark:border-neutral-600" />
          <Toolset className="mt-6">
            <Button onClick={() => p.setIsOpen(false)}>Close</Button>
            <ToolsetSpacer />
            <p className="text-sm last-of-type:mb-0">
              <Link href={APP_INFO.GitHubRepoUrl} target="_blank">
                {APP_INFO.Name} v{APP_INFO.SemVer}
              </Link>
            </p>
          </Toolset>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
