import { db, TABLE_NOTES } from "./db";
import { IndexableType } from "dexie";

export const serviceNote = {
    list: _list,
    create: _create,
    modify: _modify,
    delete: _delete,
    deleteAll: _deleteAll,
    getTopZIndex: _getTopZIndex,
};

async function _list() {
    return await db.table(TABLE_NOTES).toArray();
}

async function _getTopZIndex() {
    const result = await db.table(TABLE_NOTES).orderBy("posZ").last();
    return result?.posZ || 0;
}

type createArgs = {
    theme?: string;
    content?: string;
    posX?: number;
    posY?: number;
    posZ?: number;
    posH?: number;
    posW?: number;
    isPriority?: boolean;
    isMonospace?: boolean;
};

async function _create(args: createArgs) {
    const lastIndex = await _getTopZIndex();
    await db.table(TABLE_NOTES).add({
        ...args,
        posX: args.posX || 10,
        posY: args.posY || 10,
        posH: args.posH || 200,
        posW: args.posW || 400,
        posZ: args.posZ || lastIndex + 1,
    });
}

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

async function _modify(noteId: IndexableType, content: NoteModifyableFields) {
    await db.table(TABLE_NOTES).update(noteId, content);
}

async function _delete(noteId: IndexableType) {
    await db.table(TABLE_NOTES).where("id").equals(noteId).delete();
}

async function _deleteAll(deletePriorityNotes: boolean) {
    const notes = await db.table(TABLE_NOTES).toArray();
    notes.forEach(async (note) => {
        if (!deletePriorityNotes && note.isPriority) return;
        await db.table(TABLE_NOTES).where("id").equals(note.id).delete();
    });
}
