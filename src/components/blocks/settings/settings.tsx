import { Button } from "@/components/elements/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/elements/dialog";
import { Link } from "@/components/elements/link";
import { Toolset, ToolsetSpacer } from "@/components/elements/toolset";
import { SettingsItems } from "./settings-items";
import { SettingsRestore } from "./settings-restore";

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
            NoteDeck is a free and private sticky notes board that works
            offline. Your notes are persisted in the browser and never leave
            your device.
          </p>
          <hr className="border-base-200 dark:border-base-600 my-6" />
          <SettingsItems />
          <hr className="border-base-200 dark:border-base-600 mt-6" />
          <SettingsRestore />
          <hr className="border-base-200 dark:border-base-600 mt-6" />
          <Toolset className="mt-6">
            <Button onClick={() => p.setIsOpen(false)}>Close</Button>
            <ToolsetSpacer />
            <p className="text-sm last-of-type:mb-0">
              <Link
                href="https://github.com/abiddiscombe/notedeck"
                target="_blank"
              >
                NoteDeck v{APP_VERSION}
              </Link>
            </p>
          </Toolset>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
