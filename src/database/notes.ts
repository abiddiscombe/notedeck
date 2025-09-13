import { IndexableType } from "dexie";
import db, { TABLE_NAMES } from "./db";

export type NoteModifyableFields = {
  posX?: number;
  posY?: number;
  posZ?: number;
  posH?: number;
  posW?: number;
  theme?: string;
  content?: string;
  isMonospace?: boolean;
};

async function list() {
  return await db.table(TABLE_NAMES.Notes).toArray();
}

async function getTopZIndex() {
  const result = await db.table(TABLE_NAMES.Notes).orderBy("posZ").last();
  return result?.posZ || 0;
}

async function create(args: {
  theme?: string;
  content?: string;
  posX?: number;
  posY?: number;
  posZ?: number;
  posH?: number;
  posW?: number;
  isMonospace?: boolean;
}) {
  const lastIndex = await getTopZIndex();
  await db.table(TABLE_NAMES.Notes).add({
    ...args,
    posX: args.posX || 10,
    posY: args.posY || 10,
    posH: args.posH || 200,
    posW: args.posW || 400,
    posZ: args.posZ || lastIndex + 1,
  });
}

async function modify(noteId: IndexableType, content: NoteModifyableFields) {
  await db.table(TABLE_NAMES.Notes).update(noteId, content);
}

async function remove(noteId: IndexableType) {
  await db.table(TABLE_NAMES.Notes).where("id").equals(noteId).delete();
}

async function removeAll() {
  /**
   * DESTRUCTIVE!
   * This function will delete all existing notes.
   */

  await db.table(TABLE_NAMES.Notes).clear();
}

export default { list, create, modify, remove, removeAll, getTopZIndex };
