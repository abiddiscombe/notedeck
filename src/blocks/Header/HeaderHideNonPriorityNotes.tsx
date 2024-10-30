import { StarIcon } from "@heroicons/react/16/solid";
import Button from "../../components/elements/Button";
import Tooltip from "../../components/elements/Tooltip";
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
            ? "bg-primary-100 dark:bg-primary-700"
            : "bg-primary-50 text-primary-400 dark:bg-primary-800 dark:text-primary-500"
        }
        onClick={() => toggleSetting()}
      >
        <StarIcon />
      </Button>
    </Tooltip>
  );
};

export default HeaderHideNonPriorityNotes;
