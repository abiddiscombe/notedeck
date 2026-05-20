import { Button } from "@/components/elements/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/elements/dialog";
import { Icon } from "@/components/elements/icon";
import { Link } from "@/components/elements/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/elements/tooltip";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { SettingsPanelBackup } from "./settings-panel-backup";
import { SettingsPanelTheme } from "./settings-panel-theme";

export const SettingsPanel = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            aria-label="Show Settings Panel"
            onClick={() => setShowDialog(true)}
            className="rounded-full"
            icon={
              <Icon>
                <MenuIcon />
              </Icon>
            }
          />
        </TooltipTrigger>
        <TooltipContent align="end">Settings</TooltipContent>
      </Tooltip>
      <Dialog
        open={showDialog}
        onOpenChange={() => setShowDialog((old) => !old)}
      >
        <DialogOverlay />
        <DialogContent
          title="Settings"
          align="right"
          className="*:px-5 *:py-4.5"
        >
          <div className="mb-6 flex items-center gap-3">
            <h2 className="text-lg">Settings</h2>
            <Button
              variant="ghost"
              onClick={() => setShowDialog(false)}
              className="ml-auto rounded-full"
              aria-label="Close Settings Menu"
              icon={
                <Icon>
                  <XIcon />
                </Icon>
              }
            />
          </div>
          <p className="mb-8">
            <Link
              href="https://github.com/abiddiscombe/notedeck"
              target="_blank"
            >
              NoteDeck
            </Link>{" "}
            is a free sticky notes board that works offline. Your notes are
            saved in your browser and never leave your device.
          </p>

          <SettingsPanelTheme />
          <h3 className="mb-2">Backup & Restore</h3>
          <SettingsPanelBackup closeHostDialog={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
};
