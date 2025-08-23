import { Cog6ToothIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Button from "../../components/Button";
import Tooltip from "../../components/Tooltip";
import Settings from "../Settings/Settings";

const HeaderSettings = () => {
  const [showSettings, setShowSettings] = useState(false);
  const label = "Settings";

  return (
    <>
      <Settings isOpen={showSettings} setIsOpen={setShowSettings} />
      <Tooltip label={label} className="right-0">
        <Button
          size="sm"
          variant="ghost"
          aria-label={label}
          onClick={() => setShowSettings(true)}
          className="bg-neutral-50 dark:bg-neutral-800"
        >
          <Cog6ToothIcon />
        </Button>
      </Tooltip>
    </>
  );
};

export default HeaderSettings;
