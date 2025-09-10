import { Switch } from "@/components/ui/switch";
import settings, { SETTINGS_KEYS } from "@/database/settings";
import { useLiveQuery } from "dexie-react-hooks";

export function SettingsItems() {
  const useOpaqueNotes = useLiveQuery(() =>
    settings.read(SETTINGS_KEYS.UseOpaqueNotes),
  );

  return (
    <form className="mt-2 mb-4 flex items-start justify-between gap-6">
      <div className="max-w-sm">
        <label
          htmlFor="settings-opaque-notes"
          className="text-neutral-800 dark:text-neutral-200"
        >
          Use translucent note backgrounds
        </label>
        <p className="text-xs text-pretty text-neutral-500 dark:text-neutral-400">
          Translucency effects make it easier to spot overlapping notes.
        </p>
      </div>
      <Switch
        id="settings-opaque-notes"
        checked={useOpaqueNotes === undefined ? false : !useOpaqueNotes}
        onCheckedChange={async () =>
          await settings.write(SETTINGS_KEYS.UseOpaqueNotes, !useOpaqueNotes)
        }
      />
    </form>
  );
}
