import { Switch } from "@/components/ui/switch";
import settings, { SETTINGS_KEYS } from "@/database/settings";
import { useLiveQuery } from "dexie-react-hooks";
import ItemContainer from "./ItemContainer";

const SettingsItems = () => {
  const useOpaqueNotes = useLiveQuery(() =>
    settings.read(SETTINGS_KEYS.UseOpaqueNotes),
  );

  return (
    <>
      <ItemContainer
        label="Use translucent note backgrounds"
        summary="Translucency effects make it easier to spot overlapping notes."
      >
        <Switch
          checked={useOpaqueNotes === undefined ? false : !useOpaqueNotes}
          onCheckedChange={async () =>
            await settings.write(SETTINGS_KEYS.UseOpaqueNotes, !useOpaqueNotes)
          }
        />
      </ItemContainer>
    </>
  );
};

export default SettingsItems;
