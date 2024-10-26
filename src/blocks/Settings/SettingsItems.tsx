import { useLiveQuery } from "dexie-react-hooks";
import { settingsService } from "../../database/settings.service";
import Switch from "../../components/Switch";
import ItemContainer from "./ItemContainer";
import { SETTINGS_KEYS } from "../../utilities/constants";

const SettingsItems = () => {
  const useOpaqueNotes = useLiveQuery(
    async () => await settingsService.read(SETTINGS_KEYS.UseOpaqueNotes),
  );

  return (
    <>
      <ItemContainer
        label="Use translucent note backgrounds"
        summary="Translucency effects make it easier to spot overlapping notes."
      >
        <Switch
          state={!useOpaqueNotes}
          setState={() =>
            settingsService.write(SETTINGS_KEYS.UseOpaqueNotes, !useOpaqueNotes)
          }
        />
      </ItemContainer>
    </>
  );
};

export default SettingsItems;
