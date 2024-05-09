import { useLiveQuery } from "dexie-react-hooks";
import { serviceSettings } from "../../database/serviceSettings";
import { Switch } from "../../components/elements/Switch";
import { ControlLabel } from "../../components/elements/ControlLabel";

export function SettingsApperance() {
    const settings = useLiveQuery(() => serviceSettings.read());

    function toggleNoteTransparency() {
        serviceSettings.write({
            useOpaqueNotes: !settings.useOpaqueNotes,
        });
    }

    return (
        <>
            <ControlLabel
                label="Use translucent note backgrounds."
                summary="Show notes with a translucent background in order to spot hidden overlapping notes."
            >
                <Switch
                    state={!settings?.useOpaqueNotes}
                    setState={() => toggleNoteTransparency()}
                />
            </ControlLabel>
        </>
    );
}
