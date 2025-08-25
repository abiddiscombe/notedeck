import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/core/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import Settings from "../Settings/Settings";

const HeaderSettings = () => {
  const [showSettings, setShowSettings] = useState(false);
  const label = "Settings";

  return (
    <>
      <Settings isOpen={showSettings} setIsOpen={setShowSettings} />
      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon"
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
};

export default HeaderSettings;
