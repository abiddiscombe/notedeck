import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import settings, { SETTINGS_KEYS } from "@/database/settings";
import { StarIcon } from "@heroicons/react/16/solid";
import { useLiveQuery } from "dexie-react-hooks";

const HeaderHideNonPriorityNotes = () => {
  const activeSetting = useLiveQuery(() =>
    settings.read(SETTINGS_KEYS.HideNonPriorityNotes),
  );

  const toggleSetting = async () => {
    await settings.write(SETTINGS_KEYS.HideNonPriorityNotes, !activeSetting);
  };

  const label = activeSetting ? "Show All Notes" : "Show Priority Notes Only";

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          size="icon"
          aria-label={label}
          className={activeSetting ? "bg-neutral-100 dark:bg-neutral-700" : ""}
          onClick={() => toggleSetting()}
        >
          <StarIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
};

export default HeaderHideNonPriorityNotes;
