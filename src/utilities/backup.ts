import { type NoteItem } from "@/database/models";
import * as services from "../database/services";

export type BackupObject = {
  id: "notedeck";
  version: string;
  timestamp: number;
  content: {
    notes: NoteItem[];
  };
};

export const createBackup = async () => {
  const noteList = await services.notes.getAll();

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
};

export const unpackBackup = (content: string) => {
  const parsed = JSON.parse(content);

  if (!parsed || !parsed.content || !parsed.timestamp) {
    throw new Error(
      "Failed to restore backup. One or more fields were missing.",
    );
  }

  return parsed;
};

export const restoreBackup = async (parsedBackup: BackupObject) => {
  await services.notes.deleteAll();
  parsedBackup.content.notes.forEach(async (note: NoteItem) => {
    await services.notes.createOne(note);
  });
};
