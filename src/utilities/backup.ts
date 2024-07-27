import { NoteItem } from "../database/db";
import { notesService } from "../database/notes.service";

export type BackupObject = {
    id: "notedeck";
    version: string;
    timestamp: number;
    content: {
        notes: NoteItem[];
    };
};

const create = async () => {
    const notes = await notesService.list();

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
};

const unpack = (content: string) => {
    const parsed = JSON.parse(content);

    if (!parsed || !parsed.content || !parsed.timestamp) {
        throw new Error(
            "Failed to restore backup. One or more fields were missing.",
        );
    }

    return parsed;
};

const restore = async (parsedBackup: BackupObject) => {
    await notesService.removeAll(true);
    parsedBackup.content.notes.forEach(async (note: NoteItem) => {
        await notesService.create(note);
    });
};

export const backup = {
    create,
    unpack,
    restore,
};
