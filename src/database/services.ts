import { IndexableType } from "dexie";
import db, { TABLE_NAMES } from "./db";
import { type ModifiableNoteItem } from "./models";

const _getAll = async () => {
  return await db.table(TABLE_NAMES.Notes).toArray();
};

const _getTopZIndex = async () => {
  const result = await db.table(TABLE_NAMES.Notes).orderBy("posZ").last();
  return result?.posZ || 0;
};

const _createOne = async (args: {
  theme?: string;
  content?: string;
  posX?: number;
  posY?: number;
  posZ?: number;
  posH?: number;
  posW?: number;
  isMonospace?: boolean;
}) => {
  const lastIndex = await _getTopZIndex();
  await db.table(TABLE_NAMES.Notes).add({
    ...args,
    posX: args.posX || 10,
    posY: args.posY || 10,
    posH: args.posH || 200,
    posW: args.posW || 400,
    posZ: args.posZ || lastIndex + 1,
  });
};

const _updateOne = async (
  noteId: IndexableType,
  content: ModifiableNoteItem,
) => {
  await db.table(TABLE_NAMES.Notes).update(noteId, content);
};

const _deleteOne = async (noteId: IndexableType) => {
  await db.table(TABLE_NAMES.Notes).where("id").equals(noteId).delete();
};

const _deleteAll = async () => {
  await db.table(TABLE_NAMES.Notes).clear();
};

export const notes = {
  getAll: _getAll,
  createOne: _createOne,
  updateOne: _updateOne,
  deleteOne: _deleteOne,
  deleteAll: _deleteAll,
  getTopZIndex: _getTopZIndex,
};
