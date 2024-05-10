import { useLiveQuery } from "dexie-react-hooks";
import { serviceSettings } from "../../database/serviceSettings";
import { Item } from "./Item";
import { Checkbox } from "../../components/Checkbox";

export function SettingsApperance() {
    const settings = useLiveQuery(() => serviceSettings.read());

    function toggleNoteTransparency() {
        serviceSettings.write({
            useOpaqueNotes: !settings.useOpaqueNotes,
        });
    }

    return (
        <>
            <Item
                label="Use translucent note backgrounds"
                summary="Translucency effects make it easier to spot overlapping notes."
            >
                <Checkbox
                    state={!settings?.useOpaqueNotes}
                    setState={() => toggleNoteTransparency()}
                />
            </Item>
        </>
    );
}
