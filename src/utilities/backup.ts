import { NoteItem, SettingItem } from "../database/db";
import { serviceNote } from "../database/serviceNote";
import { serviceSettings } from "../database/serviceSettings";

export const backup = {
    create: _create,
    unpack: _unpack,
    restore: _restore,
};

export type BackupObject = {
    id: "notedeck";
    version: string;
    timestamp: number;
    content: {
        notes: NoteItem[];
        settings: SettingItem["content"];
    };
};

async function _create() {
    const notes = await serviceNote.list();
    const settings = await serviceSettings.read();

    // Represent the user's data as object.
    const backupContent: BackupObject = {
        id: "notedeck",
        version: APP_VERSION,
        timestamp: Date.now(),
        content: {
            notes: notes,
            settings: settings,
        },
    };

    return new Blob([JSON.stringify(backupContent)], {
        type: "application/json",
    });
}

function _unpack(content: string) {
    const parsed = JSON.parse(content);

    if (!parsed || !parsed.content || !parsed.timestamp) {
        throw new Error(
            "Failed to restore backup. One or more fields were missing.",
        );
    }

    return parsed;
}

async function _restore(parsedBackup: BackupObject) {
    await serviceNote.deleteAll(true);

    if (parsedBackup.content.notes) {
        parsedBackup.content.notes.forEach(async (note: NoteItem) => {
            await serviceNote.create(note);
        });
    }

    if (parsedBackup.content.settings) {
        await serviceSettings.write(parsedBackup.content.settings);
    }
}
