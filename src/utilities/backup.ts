import { NoteItem } from "../database/db";
import notes from "../database/notes";

export type BackupObject = {
  id: "notedeck";
  version: string;
  timestamp: number;
  content: {
    notes: NoteItem[];
  };
};

async function create() {
  const noteList = await notes.list();

  // Represent the user's notes.
  const backupContent: BackupObject = {
    id: "notedeck",
    version: APP_VERSION,
    timestamp: Date.now(),
    content: {
      notes: noteList,
    },
  };

  return new Blob([JSON.stringify(backupContent)], {
    type: "application/json",
  });
}

function unpack(content: string) {
  const parsed = JSON.parse(content);

  if (!parsed || !parsed.content || !parsed.timestamp) {
    throw new Error(
      "Failed to restore backup. One or more fields were missing.",
    );
  }

  return parsed;
}

async function restore(parsedBackup: BackupObject) {
  await notes.removeAll(true);
  parsedBackup.content.notes.forEach(async (note: NoteItem) => {
    await notes.create(note);
  });
}

export const backup = {
  create,
  unpack,
  restore,
};
