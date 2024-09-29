import { db } from "./db";
import { IndexableType } from "dexie";
import { TABLE_NAMES } from "../utilities/constants";

export type NoteModifyableFields = {
  posX?: number;
  posY?: number;
  posZ?: number;
  posH?: number;
  posW?: number;
  theme?: string;
  content?: string;
  isPriority?: boolean;
  isMonospace?: boolean;
};

const list = async () => {
  return await db.table(TABLE_NAMES.Notes).toArray();
};

const getTopZIndex = async () => {
  const result = await db.table(TABLE_NAMES.Notes).orderBy("posZ").last();
  return result?.posZ || 0;
};

const create = async (args: {
  theme?: string;
  content?: string;
  posX?: number;
  posY?: number;
  posZ?: number;
  posH?: number;
  posW?: number;
  isPriority?: boolean;
  isMonospace?: boolean;
}) => {
  const lastIndex = await getTopZIndex();
  await db.table(TABLE_NAMES.Notes).add({
    ...args,
    posX: args.posX || 10,
    posY: args.posY || 10,
    posH: args.posH || 200,
    posW: args.posW || 400,
    posZ: args.posZ || lastIndex + 1,
  });
};

const modify = async (noteId: IndexableType, content: NoteModifyableFields) => {
  await db.table(TABLE_NAMES.Notes).update(noteId, content);
};

const remove = async (noteId: IndexableType) => {
  await db.table(TABLE_NAMES.Notes).where("id").equals(noteId).delete();
};

const removeAll = async (deletePriorityNotes: boolean) => {
  const notes = await db.table(TABLE_NAMES.Notes).toArray();
  notes.forEach(async (note) => {
    if (!deletePriorityNotes && note.isPriority) {
      return;
    }

    await db.table(TABLE_NAMES.Notes).where("id").equals(note.id).delete();
  });
};

export const notesService = {
  list,
  create,
  modify,
  remove,
  removeAll,
  getTopZIndex,
};
