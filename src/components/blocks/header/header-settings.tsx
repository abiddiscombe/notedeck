import { Button } from "@/components/elements/button";
import { Icon } from "@/components/elements/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/elements/tooltip";
import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import { Settings } from "../settings/settings";

export function HeaderSettings() {
  const [showSettings, setShowSettings] = useState(false);
  const label = "Settings";

  return (
    <>
      <Settings isOpen={showSettings} setIsOpen={setShowSettings} />
      <Tooltip>
        <TooltipTrigger>
          <Button
            icon={
              <Icon>
                <SettingsIcon />
              </Icon>
            }
            aria-label={label}
            onClick={() => setShowSettings(true)}
          />
        </TooltipTrigger>
        <TooltipContent align="end">{label}</TooltipContent>
      </Tooltip>
    </>
  );
}
