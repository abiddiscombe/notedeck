import { useLiveQuery } from "dexie-react-hooks";
import { serviceSettings } from "../../database/serviceSettings";
import { Switch } from "../../components/Switch";
import { ItemContainer } from "./ItemContainer";

export function SettingsItems() {
    const autoUpdateCheck = useLiveQuery(
        async () => await serviceSettings.read("autoUpdateCheck"),
    );
    const useOpaqueNotes = useLiveQuery(
        async () => await serviceSettings.read("useOpaqueNotes"),
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
                        serviceSettings.write(
                            "autoUpdateCheck",
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
                        serviceSettings.write("useOpaqueNotes", !useOpaqueNotes)
                    }
                />
            </ItemContainer>
        </>
    );
}
