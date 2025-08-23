import { StarIcon } from "@heroicons/react/16/solid";
import Button from "../../components/Button";
import Tooltip from "../../components/Tooltip";
import { useLiveQuery } from "dexie-react-hooks";
import settings, { SETTINGS_KEYS } from "../../database/settings";

const HeaderHideNonPriorityNotes = () => {
  const activeSetting = useLiveQuery(() =>
    settings.read(SETTINGS_KEYS.HideNonPriorityNotes),
  );

  const toggleSetting = async () => {
    await settings.write(SETTINGS_KEYS.HideNonPriorityNotes, !activeSetting);
  };

  const label = activeSetting ? "Show All Notes" : "Show Priority Notes Only";

  return (
    <Tooltip label={label}>
      <Button
        size="sm"
        variant="ghost"
        aria-label={label}
        className={
          activeSetting
            ? "bg-neutral-100 dark:bg-neutral-700"
            : "bg-neutral-50 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500"
        }
        onClick={() => toggleSetting()}
      >
        <StarIcon />
      </Button>
    </Tooltip>
  );
};

export default HeaderHideNonPriorityNotes;
