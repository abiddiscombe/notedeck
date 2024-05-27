import { NoteItem } from "../database/db";
import { serviceNote } from "../database/serviceNote";

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
    };
};

async function _create() {
    const notes = await serviceNote.list();

    // Represent the user's notes.
    const backupContent: BackupObject = {
        id: "notedeck",
        version: APP_VERSION,
        timestamp: Date.now(),
        content: {
            notes: notes,
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
    await serviceNote.removeAll(true);

    if (parsedBackup.content.notes) {
        parsedBackup.content.notes.forEach(async (note: NoteItem) => {
            await serviceNote.create(note);
        });
    }
}
