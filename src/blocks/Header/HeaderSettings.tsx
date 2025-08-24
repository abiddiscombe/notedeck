import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";
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
            <Cog6ToothIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent align="end">{label}</TooltipContent>
      </Tooltip>
    </>
  );
};

export default HeaderSettings;
