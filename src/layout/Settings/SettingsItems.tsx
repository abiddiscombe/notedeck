import { useLiveQuery } from "dexie-react-hooks";
import { settingsService } from "../../database/settings.service";
import Switch from "../../components/Switch";
import ItemContainer from "./ItemContainer";
import { SETTINGS_KEYS } from "../../utilities/constants";

export default () => {
    const autoUpdateCheck = useLiveQuery(
        async () => await settingsService.read(SETTINGS_KEYS.AutoUpdateCheck),
    );
    const useOpaqueNotes = useLiveQuery(
        async () => await settingsService.read(SETTINGS_KEYS.UseOpaqueNotes),
    );

    return (
        <>
            <ItemContainer
                label="Automatically check for updates"
                summary="Check and prompt to install updates on app startup."
            >
                <Switch
                    state={autoUpdateCheck ?? false}
                    setState={() =>
                        settingsService.write(
                            SETTINGS_KEYS.AutoUpdateCheck,
                            !autoUpdateCheck,
                        )
                    }
                />
            </ItemContainer>
            <ItemContainer
                label="Use translucent note backgrounds"
                summary="Translucency effects make it easier to spot overlapping notes."
            >
                <Switch
                    state={!useOpaqueNotes}
                    setState={() =>
                        settingsService.write(
                            SETTINGS_KEYS.UseOpaqueNotes,
                            !useOpaqueNotes,
                        )
                    }
                />
            </ItemContainer>
        </>
    );
};
