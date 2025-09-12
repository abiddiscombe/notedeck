import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import { Settings } from "../Settings/Settings";

export function HeaderSettings() {
  const [showSettings, setShowSettings] = useState(false);
  const label = "Settings";

  return (
    <>
      <Settings isOpen={showSettings} setIsOpen={setShowSettings} />
      <Tooltip>
        <TooltipTrigger>
          <Button
            ratio="square"
            aria-label={label}
            onClick={() => setShowSettings(true)}
          >
            <Icon>
              <SettingsIcon />
            </Icon>
          </Button>
        </TooltipTrigger>
        <TooltipContent align="end">{label}</TooltipContent>
      </Tooltip>
    </>
  );
}
