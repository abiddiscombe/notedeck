import { useLiveQuery } from "dexie-react-hooks";
import Switch from "../../components/Switch";
import settings, { SETTINGS_KEYS } from "../../database/settings";
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
          state={!useOpaqueNotes}
          setState={async () =>
            await settings.write(SETTINGS_KEYS.UseOpaqueNotes, !useOpaqueNotes)
          }
        />
      </ItemContainer>
    </>
  );
};

export default SettingsItems;
