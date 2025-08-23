import Tooltip from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Settings from "../Settings/Settings";

const HeaderSettings = () => {
  const [showSettings, setShowSettings] = useState(false);
  const label = "Settings";

  return (
    <>
      <Settings isOpen={showSettings} setIsOpen={setShowSettings} />
      <Tooltip label={label} className="right-0">
        <Button
          size="icon"
          aria-label={label}
          onClick={() => setShowSettings(true)}
        >
          <Cog6ToothIcon />
        </Button>
      </Tooltip>
    </>
  );
};

export default HeaderSettings;
